import {useCallback} from "react";
import {useTargetStore} from "../store/target.store";
import {useWalletHook} from "./wallet.hook";
import {useAppStore} from "../store/index.store";
import {useWalletStore} from "../store/wallet.store";
import useAxios from "../service";
import {useTransactionHook} from "./transactions.hook";

export const useTargetHook = () => {
   const {targets, setTargets} = useTargetStore()
   const {convertToCurrentCurrency} = useWalletHook()
   const {currencyRate} = useWalletStore()
   const {currentCurrency} = useAppStore()

   const {wallets} = useWalletStore()

   const {updateStatistics} = useTransactionHook()

   const {setInfo, setError} = useAppStore()

   const {fetchData} = useAxios()

   const summOfAutoPays = (target) => {
      if (target.auto_pays && target.auto_pays.length) {
         return target.auto_pays.reduce((prev, item) => prev + +item.amount, 0)
      }
      return target.target_money
   }

   const supposedComes = useCallback((is_income) => {
      const currentTargets = targets.filter(t => (is_income ? t.is_income : !t.is_income))
      if (currentTargets.length) {
         return convertToCurrentCurrency(currentTargets
             .reduce((a, b) => {
                return a + convertToCurrentCurrency(+summOfAutoPays(b), b.currency)
             }, 0), currentCurrency)
      }
      return 0
   }, [targets, currencyRate, currentCurrency])

   const getTargets = useCallback(async () => {
      const res = await fetchData("/money/money/", "GET")
      setTargets(res)
   }, [])

   const addOrUpdateTargets = useCallback(async (data, method = "POST", id = "") => {
      const url = id === "" ? "" : `${id}/`
      const target = await fetchData(`/money/money/${url}`, method, data)
      let prevTarget = target;
      if (target) {
         if (!target.auto_pays) prevTarget.auto_pays = []
         if (id) prevTarget = targets.find(t => +t.id === +id)
         setTargets([...targets.filter(t => t.id !== target.id), {...target, auto_pays: prevTarget.auto_pays}])
         setInfo(`Successfully ${id === "" ? "added" : "updated"}`)
      }
   }, [targets])

   const deleteTarget = useCallback(async (id) => {
      await fetchData(`/money/money/${id}`, "DELETE")
      setTargets([...targets.filter(t => t.id !== id)])
      setInfo("Successfully deleted")
   }, [targets])

   const addAutoPay = useCallback(async (data, wallet, target) => {

      const autopay = await fetchData("/money/auto-pay/", "POST", {...data})

      const currentTarget = targets.find(t => +t.id === +data.money)

      const editedTargets = [
         ...targets.filter(t => +t.id !== +data.money),
         {
            ...currentTarget,
            auto_pays: [
               ...(currentTarget.auto_pays || []).filter(t => +t.id !== +data.id),
               {
                  ...autopay,
                  wallet,
                  money: target
               }
            ]
         }
      ]
      setTargets(editedTargets)
      setInfo("Auto payment successfully created")
   }, [targets])

   const deleteAutoPay = useCallback(async (id, targetId) => {
      await fetchData(`/money/auto-pay/${id}`, "DELETE")
      const target = targets.find(t => +t.id === +targetId)
      setTargets([
         ...targets.filter(t => +t.id !== +targetId),
         {
            ...target,
            auto_pays: [
               ...target.auto_pays.filter(t => t.id !== id),
            ]
         }
      ])
   }, [targets])

   const updateAutoPay = useCallback(async (auto_pay, pay_amount) => {
      const data = {
         ...auto_pay,
         money: auto_pay.money.id,
         wallet: auto_pay.wallet.id
      }

      const wallet = wallets.find(wallet => wallet.id === auto_pay.wallet.id)

      if(!auto_pay.money.is_income && pay_amount > wallet.balance) return setError("not enough money")

      const result = await fetchData(`/money/auto-pay/${auto_pay.id}/`, "PUT", data)
      const autoPay = result.auto_pay
      const transaction = result.transaction

      const target = targets.find(t => +t.id === +autoPay.money)

      updateStatistics(transaction, auto_pay.wallet, auto_pay.money)

      const editedTarget = {
         ...target,
         auto_pays: [
            ...target.auto_pays.filter(t => +t.id !== +autoPay.id),
            {
               ...autoPay,
               wallet: auto_pay.wallet,
               money: auto_pay.money
            }
         ]
      }
      setTargets([
         ...targets.filter(t => +t.id !== +autoPay.money),
         editedTarget
      ])
      setInfo("Done")
   }, [targets, wallets])

   return {
      supposedComes,
      getTargets,
      addOrUpdateTargets,
      deleteTarget,
      addAutoPay,
      deleteAutoPay,
      updateAutoPay,
      summOfAutoPays
   }
}

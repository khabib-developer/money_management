import {useCallback} from "react";
import {useTargetStore} from "../store/target.store";
import {useWalletHook} from "./wallet.hook";
import {useAppStore} from "../store/index.store";
import {useWalletStore} from "../store/wallet.store";
import useAxios from "../service";
import {useTransactionsStore} from "../store/transaction.store";
import {useTransactionHook} from "./transactions.hook";

export const useTargetHook = () => {
   const {targets, setTargets} = useTargetStore()
   const {convertToCurrentCurrency} = useWalletHook()
   const {currencyRate} = useWalletStore()
   const {income, outcome, setIncome, setOutcome} = useTransactionsStore()
   const {currentCurrency} = useAppStore()

   const {addTransaction} = useTransactionHook()

   const {setInfo} = useAppStore()

   const {fetchData} = useAxios()

   const summOfAutoPays = (target) => {
      if (target.auto_pays.length) {
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
      const target = await fetchData(`/money/money/${id}`, method, data)

      if (target) {
         setTargets([...targets.filter(t => t.id !== target.id), target])
         setInfo(`Successfully ${id.trim() === "" ? "added" : "updated"}`)
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

   const updateAutoPay = useCallback(async (money, data, wallet) => {
      const result = await fetchData(`/money/auto-pay/${data.id}/`, "PUT", data)
      const autoPay = result.auto_pay
      const transaction = result.transaction
      const target = targets.find(t => +t.id === +money.id)
      const editedTarget = {
         ...target,
         auto_pays: [
            ...target.auto_pays.filter(t => +t.id !== +autoPay.id),
            {
               ...autoPay,
               wallet:wallet,
               money: money
            }
         ]
      }
      setTargets([
         ...targets.filter(t => +t.id !== +money.id),
         editedTarget
      ])

      await addTransaction(transaction, wallet, editedTarget, true)
      setInfo("Done")
   }, [targets])

   return {supposedComes, getTargets, addOrUpdateTargets, deleteTarget, addAutoPay, deleteAutoPay, updateAutoPay, summOfAutoPays}
}

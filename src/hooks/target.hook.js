import {useCallback} from "react";
import {useTargetStore} from "../store/target.store";
import {useWalletHook} from "./wallet.hook";
import {useAppStore} from "../store/index.store";
import {useWalletStore} from "../store/wallet.store";
import useAxios from "../service";

export const useTargetHook = () => {
   const {targets, setTargets} = useTargetStore()
   const {convertToCurrentCurrency} = useWalletHook()
   const {currencyRate} = useWalletStore()

   const {currentCurrency} = useAppStore()

   const {setInfo} = useAppStore()

   const {fetchData} = useAxios()

   const supposedComes = useCallback((is_income) => {
      const currentTargets = targets.filter(t => (is_income ? t.is_income : !t.is_income))
      if (currentTargets.length) {
         return convertToCurrentCurrency(currentTargets
             .reduce((a, b) => {
                return a + convertToCurrentCurrency(+b.target_money, b.currency)
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

   const addAutoPay = useCallback((data, wallet, target) => {
      const editedTargets = [
         ...targets.filter(t => +t.id !== +data.money),
         {
            ...targets.find(t => +t.id === +data.money),
            autoPay: [
               {
                  ...data,
                  wallet,
                  paid_amount: 0,
                  target
               }
            ]
         }
      ]
      setTargets(editedTargets)
   }, [targets])


   return {supposedComes, getTargets, addOrUpdateTargets, deleteTarget, addAutoPay}
}

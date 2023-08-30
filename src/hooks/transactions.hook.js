import React, {useCallback} from "react";
import {useTransactionsStore} from "../store/transaction.store";
import {useAppStore} from "../store/index.store";
import {useWalletHook} from "./wallet.hook";
import {useTargetStore} from "../store/target.store";
import {useWalletStore} from "../store/wallet.store";
import useAxios from "../service";


export const useTransactionHook = () => {
   const {
      outcome,
      income,
      setIncome,
      setOutcome,
      incomeDuringThisMonth,
      outcomeDuringThisMonth,
      setInitial,
      setStatistics
   } = useTransactionsStore()
   const {totalBalance, getCurrencyRate} = useWalletHook()
   const {wallets, setWallet} = useWalletStore()
   const {targets, setTargets} = useTargetStore()
   const {fetchData} = useAxios()

   const {currentCurrency} = useAppStore()

   const getTransaction = useCallback(async () => {
      const res = await fetchData("/money/money-item/")
      if (res) {
         setIncome(res.income)
         setOutcome(res.outcome)
      }
   }, [])

   const updateStatistics = (data, wallet, money) => {
      const target = targets.find(t => t.id === money.id)
      const w = wallets.find(w => w.id === wallet.id)

      setTargets([...targets.filter(t => t.id !== money.id), {
         ...target,
         actually: money.actually + data.amount
      }])

      if (target.is_income) {
         setWallet([
            ...wallets.filter(w => w.id !== wallet.id),
            {
               ...w,
               balance: w.balance + data.amount
            }
         ])
         setIncome([...income, {...data, wallet, money}])
         setStatistics(incomeDuringThisMonth + data.amount, outcomeDuringThisMonth)
         return
      }
      setStatistics(incomeDuringThisMonth, outcomeDuringThisMonth + data.amount)
      setWallet([
         ...wallets.filter(w => w.id !== wallet.id),
         {
            ...w,
            balance: w.balance - data.amount
         }
      ])
      setOutcome([...outcome, {...data, wallet, money}])
   }

   const addTransaction = useCallback(async (data, wallet, money) => {

      const transaction = await fetchData("/money/money-item/", "POST", data)

      if (transaction) updateStatistics(transaction, wallet, money)

   }, [income, outcome, targets, wallets, incomeDuringThisMonth, outcomeDuringThisMonth])

   const getSumTransactions = useCallback(async (currency = "UZS") => {
      const result = await fetchData("/money/dashboard/", "GET")
      await getCurrencyRate()
      if (result) {
         setInitial(result[`total_balance_${currency.toLowerCase()}`] - result[`income_${currency.toLowerCase()}`] + result[`outcome_${currency.toLowerCase()}`])
         setStatistics(result[`income_${currency.toLowerCase()}`], result[`outcome_${currency.toLowerCase()}`])
      }
   }, [currentCurrency])

   return {addTransaction, getTransaction, getSumTransactions, updateStatistics}
}
import useAxios from "../service";
import {useCallback, useEffect, useMemo} from "react";
import {useWalletStore} from "../store/wallet.store";
import {currency} from "../contants";
import {useAppStore} from "../store/index.store";
import {useTransactionsStore} from "../store/transaction.store";
import {useNavigate} from "react-router-dom";


export const useWalletHook = () => {

   const {fetchData} = useAxios()

   const navigate = useNavigate()

   const {setInfo, currentCurrency, setError} = useAppStore()

   const {transactions, initial, setInitial} = useTransactionsStore()

   const {setCurrencyRate, wallets, currencyRate, setWallet, setCategories} = useWalletStore()

   const exchangeMoney = useCallback(async (data) => {
      console.log(data)
   }, [wallets])

   const redirectToWallet = useCallback(() => {
      if(!wallets.length) navigate("/admin/profile")
   }, [wallets])

   const getCategories = useCallback(async () => {
      const result = await fetchData("/accounts/category-wallet/")
      setCategories(result)
   }, [])

   const getCurrencyRate = useCallback(async () => {
      const res = await fetchData("https://cbu.uz/uz/arkhiv-kursov-valyut/json/", "GET", null, {}, false, false)
      setCurrencyRate(res[0])
   }, [])

   const convert = useCallback((from, to, amount) => {
      if(currencyRate) {
         if(from === to)
            return +amount
         if(to === currency.uzs)
            return +currencyRate.Rate * amount
         else if(to === currency.usd)
            return +amount / +currencyRate.Rate

      }
   }, [currencyRate, transactions])

   const convertToCurrentCurrency = (amount, currency) => {
      return currentCurrency.toUpperCase() === currency.toUpperCase() ? amount : convert(currency, currentCurrency, +amount)
   }

   const totalBalance = useCallback(() => {
      if(wallets.length) {
         return wallets.reduce((sum, wallet) => sum + convertToCurrentCurrency(wallet.balance, wallet.currency), 0)
      }
      return 0
   }, [wallets, currentCurrency, transactions ])

   const addWallet = useCallback(async (data) => {
      const res = await fetchData("/accounts/wallet/", "POST", data)
      if(res) {
         setWallet([...wallets, res])
         setInfo("wallet created")
         setInitial(initial + convertToCurrentCurrency( res.balance, res.currency ) )
      }
   }, [wallets, initial, currentCurrency])

   const getWallet = useCallback(async () => {
      const res = await fetchData("/accounts/wallet", "GET")
      if(res) setWallet(res)
   }, [])

   const updateWallet = useCallback(async (data, id, remove = false) => {
      const wallet = await fetchData(`/accounts/wallet/${id}/`, "PATCH", data)
      if(remove) {
         setInitial(initial - convertToCurrentCurrency( wallet.balance, wallet.currency ))
         setWallet([...wallets.filter(w => w.id !== id)])
         return
      }
      if(wallet) {
         setWallet([...wallets.filter(w => w.id !== id), wallet])
         setInfo("Wallet updated")
      }
   }, [wallets])

   return {getCurrencyRate, convert, totalBalance, exchangeMoney, convertToCurrentCurrency, addWallet, getWallet, updateWallet, getCategories, redirectToWallet }
}
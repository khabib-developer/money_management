import {create}  from  "zustand"
export const useWalletStore = create((set) => ({
   wallets: [],
   setWallet: (wallets) => set(() => ({wallets})),
   currencyRate: null,
   setCurrencyRate: (currencyRate) => set(() => ({currencyRate})),
   categories: [],
   setCategories: (categories) => set(() => ({categories}))
}))
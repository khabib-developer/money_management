import {create}  from  "zustand"
import {currency} from "../contants";

export const useAppStore = create((set) => ({
   user: null,
   setUser: (user) => set(() => ({user})),
   permission: false,
   setPermission: (permission) => set(() => ({permission})),
   loading: false,
   setLoading: (loading) => set(() => ({loading})),
   error: null,
   setError: (error) => set(() => ({error})),
   info: null,
   clear:() => set(() => ({error: null, info: null})),
   setInfo: (info) => set(() => ({info})),
   currentCurrency: currency.uzs,
   setCurrency: (currentCurrency) => set(() => ({currentCurrency}))
}))
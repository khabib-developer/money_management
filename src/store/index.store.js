import {create}  from  "zustand"
import {currency} from "../contants";

export const useAppStore = create((set) => ({
   darkMode: false,
   setDarkMode: (darkMode) => set(() => ({darkMode})),
   user: null,
   setUser: (user) => set(() => ({user})),
   permission: false,
   setPermission: (permission) => set(() => ({permission})),
   loading: false,
   setLoading: (loading) => set(() => ({loading})),
   error: null,
   setError: (error) => set(() => ({error})),
   info: null,
   setInfo: (info) => set(() => ({info})),
   clear:() => set(() => ({error: null, info: null})),
   currentCurrency: currency.uzs,
   setCurrency: (currentCurrency) => set(() => ({currentCurrency})),
   full: true,
   setFull: (full) => set(() => ({full}))

}))
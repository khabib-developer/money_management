import {useCallback} from "react";
import useAxios from "../service";
import {useAppStore} from "../store/index.store";
import {useNavigate} from "react-router-dom";
import {useWalletHook} from "./wallet.hook";
import {useTargetHook} from "./target.hook";
import {useTransactionHook} from "./transactions.hook";

export const useAuthHook = () => {

   const {fetchData} = useAxios()

   const {setUser, setPermission} = useAppStore()

   const {getWallet, getCategories} = useWalletHook()

   const { getTargets } = useTargetHook()

   const {getTransaction, getSumTransactions} = useTransactionHook()

   const navigate = useNavigate()

   const auth = useCallback(async (url, body) => {
      const user = await fetchData(`/accounts${url}`, "POST", body)
      if(user) {
         setUser(user)
         navigate("/admin/default")
      }
   }, [])

   const check = useCallback(async (admin) => {
      const user = await fetchData("accounts/session/", "GET", null, {}, false)
      if(admin && user) {
         await getWallet()
         await getTargets()
         await getTransaction()
         await getSumTransactions()
         await getCategories()
      }
      setPermission(!!user)
      setUser(user)

      if(!admin && user) navigate("/admin/default")
      if(admin && !user) navigate("/auth/sign-in")
   }, [])

   const logout = useCallback(async () => {
      await fetchData("accounts/logout/", "POST")
      setUser(null)
      navigate("/auth/sign-in")
   }, [])


   return {auth, check, logout}
}
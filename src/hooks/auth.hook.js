import {useCallback} from "react";
import useAxios from "../service";
import {useAppStore} from "../store/index.store";
import {useNavigate} from "react-router-dom";
import {useWalletHook} from "./wallet.hook";
import {useTargetHook} from "./target.hook";
import {useTransactionHook} from "./transactions.hook";

const BASE_URL = "http://35.225.155.180"

export const useAuthHook = () => {

   const {fetchData} = useAxios()

   const {setInfo, setError, setActiveUserData} = useAppStore()

   const {setUser, setPermission, user} = useAppStore()

   const {getWallet, getCategories} = useWalletHook()

   const { getTargets } = useTargetHook()

   const {getTransaction, getSumTransactions} = useTransactionHook()

   const navigate = useNavigate()

   const auth = useCallback(async (url, body, login = true) => {
      const user = await fetchData(`/accounts${url}`, "POST", body, {}, true)
      if(user) {
         if(login) {
            setUser(user)
            navigate("/admin/profile")
            return
         }
         setInfo("Activation link sent successfully to email address")
         return true
      }
   }, [])

   const exitTime = useCallback(async (user) => {
      await fetchData("accounts/exit-session/", "POST", {user, exit_time: Date.now()})
   }, [])

   const sendLinkToMail = useCallback(async (body) => {
      const data = await fetchData(`/accounts/reset-password/`, "POST", body, {}, false)
      if(data) {
         setInfo("Link successfully sent")
         return true
      }
      setError("Email not found")
      return false
   }, [])

   const verifyLink = useCallback(async (token) => {
      return await fetchData(`${BASE_URL}/api/accounts/verify/?token=${token}`)
   }, [])

   const verifyRegisterLink = useCallback(async (token) => {
      const user = await fetchData(`${BASE_URL}/api/accounts/register/?token=${token}`)
      if(user) {
         setActiveUserData(user)
         setInfo("Link successfully activated")
         navigate("/auth/sign-in")
      }
   }, [])

   const resetPassword = useCallback(async (body) => {
      const data = await fetchData(`/accounts/new-password/`, "POST", body, {}, false)
      if(data) {
         setInfo("Password updated")
         setTimeout(() => {
            navigate("/auth/sign-in")
         }, 500)
         return
      }
      setError("Email not found")
   }, [])

   const check = useCallback(async (admin) => {
      const user = await fetchData("accounts/session/", "GET", null, {}, false, true, false)
      if(admin && user) {
         await getWallet()
         await getTargets()
         await getTransaction()
         await getSumTransactions()
         await getCategories()
      }
      setPermission(!!user)
      setUser(user)

      if(!admin && user) {
         navigate("/admin/default")
      }
      if(admin && !user) {
         navigate("/auth/sign-in")
      }
   }, [])

   const logout = useCallback(async () => {
      await fetchData("accounts/logout/", "POST")
      setUser(null)
      navigate("/auth/sign-in")
   }, [])

   const deleteAccount = useCallback(async (data) => {
      const user = await fetchData("accounts/delete-account/", "POST", data)
      if(user) navigate("/auth/sign-in")
   }, [])


   return {auth, check, exitTime, logout, sendLinkToMail, resetPassword, verifyLink, deleteAccount, verifyRegisterLink}
}
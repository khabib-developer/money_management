import InputField from "components/fields/InputField";
import {Link, useLocation, useParams} from "react-router-dom";
import {useAuthHook} from "../../hooks/auth.hook";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useEffect, useState} from "react";
import {useAppStore} from "../../store/index.store";

export default function VerifyLink() {
   const {resetPassword, verifyLink} = useAuthHook()
   const {check} = useAuthHook()

   const [permission, setPermission] = useState(false)

   const [invalidToken, setInvalidToken] = useState(false)

   let { token } = useParams();

   useEffect(() => {
      (async function(){
         await check(false)
         const user = await verifyLink(token)
         if(user) {
            setPermission(user)
         }
         else setInvalidToken(true)
      }())
   }, [token])

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 password: yup.string().required().min(8),
                 confirmPassword: yup.string()
                     .required().oneOf([yup.ref('password')], 'Passwords does not match')
              })
              .required()
      ),
   });

   const onSubmit = async (data) => {
      const obj = {
         ...permission,
         password: data.password
      }
      await resetPassword(obj)
   }

   if(!permission)
      return (
          <div className="mt-16 mb-16 flex h-full w-full text-navy-700 dark:text-white items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
             {!invalidToken?"Verifying link...":<span>Token expired or invalid - <Link to={"/auth/sign-in"}>sign in</Link></span>}
          </div>
      )

   return (
       <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
             <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                Reset password
             </h4>
             <p className="mb-9 ml-1 text-base text-gray-600">
                Enter your password!
             </p>

             {/* Password */}
             <InputField
                 variant="auth"
                 extra="mb-3"
                 label="Password*"
                 placeholder="Min. 8 characters"
                 id="password"
                 type="password"
                 state={errors.password && "error"}
                 register={register}
                 name="password"
             />

             <InputField
                 variant="auth"
                 extra="mb-3"
                 label="Confirm Password*"
                 placeholder="Min. 8 characters"
                 id="password"
                 type="password"
                 state={errors.confirmPassword && "error"}
                 register={register}
                 name="confirmPassword"
             />
             <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Change
             </button>
             <div className="mt-4">
                <Link
                    to="/auth/forgot-password"
                    className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                >
                   Another email?
                </Link>
             </div>
          </form>
       </div>
   );
}

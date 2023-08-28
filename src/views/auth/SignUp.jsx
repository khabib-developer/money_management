import InputField from "components/fields/InputField";
import {Link} from "react-router-dom";
import {useAuthHook} from "../../hooks/auth.hook";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useEffect, useState} from "react";

export default function SignUp() {
   const {auth} = useAuthHook()
   const {check} = useAuthHook()
   const [sent, setSent] = useState(false)
   useEffect(() => {
      check(false).then(() => {
      })
   }, [])
   const {
      register,
      handleSubmit,
      watch,
      formState: {errors},
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 email: yup.string().email().required(),
                 first_name: yup.string().required().min(3),
                 last_name: yup.string(),
                 password: yup.string().required().min(8),
                 confirmPassword: yup.string()
                     .required().oneOf([yup.ref('password')], 'Passwords does not match')
              })
              .required()
      ),
   });

   const onSubmit = async (data) => {
      const result = await auth("/register/", {...data, username: data.email}, false)
      setSent(result)
   }

   return (
       <div
           className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
          {
             sent ?
                 <h4 className="mb-2.5 mt-32 text-4xl font-bold text-navy-700 dark:text-white">
                    Activation link sent to your email address, check your email address
                 </h4> :
                 <form onSubmit={handleSubmit(onSubmit)}
                       className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                       Sign Up
                    </h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                       Enter your username, email and password to sign up!
                    </p>

                    {/* Username */}
                    <div className="flex justify-between gap-3">
                       <InputField
                           variant="auth"
                           extra="mb-3 flex-1"
                           label="First Name*"
                           placeholder="Name"
                           id="email"
                           type="text"
                           state={errors.first_name && "error"}
                           register={register}
                           name="first_name"
                       />
                       <InputField
                           variant="auth"
                           extra="mb-3 flex-1"
                           label="Last Name"
                           placeholder="Last Name"
                           id="email"
                           type="text"
                           state={errors.last_name && "error"}
                           register={register}
                           name="last_name"
                       />
                    </div>


                    {/* Email */}
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email*"
                        placeholder="mail@simmmple.com"
                        id="email"
                        type="text"
                        state={errors.email && "error"}
                        register={register}
                        name={"email"}
                    />

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

                    <button
                        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                       Sign Up
                    </button>
                    <div className="mt-4">
                <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                  Already have account?
                </span>
                       <Link
                           to="/auth/sign-in"
                           className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                       >
                          Login
                       </Link>
                    </div>
                 </form>

          }

       </div>
   );
}

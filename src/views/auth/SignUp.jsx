import InputField from "components/fields/InputField";
import {Link, useLocation} from "react-router-dom";
import {useAuthHook} from "../../hooks/auth.hook";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useEffect} from "react";

export default function SignUp() {
   const {auth} = useAuthHook()
   const {check} = useAuthHook()
   useEffect(() => {
      check(false).then(() => {})
   }, [])
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 username: yup.string().required().min(4),
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

   const onSubmit = async (data) => await auth("/register/", data)
   return (
       <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
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
                    placeholder="Something"
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
                    placeholder="Something"
                    id="email"
                    type="text"
                    state={errors.last_name && "error"}
                    register={register}
                    name="last_name"
                />
             </div>
             <InputField
                 variant="auth"
                 extra="mb-3"
                 label="Username*"
                 placeholder="Something"
                 id="email"
                 type="text"
                 state={errors.username && "error"}
                 register={register}
                 name="username"
             />

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
             {/* Checkbox */}
             {/*<div className="mb-4 flex items-center justify-between px-2">*/}
             {/*   <div className="flex items-center">*/}
             {/*      <Checkbox />*/}
             {/*      <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">*/}
             {/*         Keep me logged In*/}
             {/*      </p>*/}
             {/*   </div>*/}
             {/*   <a*/}
             {/*       className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"*/}
             {/*       href=" "*/}
             {/*   >*/}
             {/*      Forgot Password?*/}
             {/*   </a>*/}
             {/*</div>*/}
             <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
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
       </div>
   );
}

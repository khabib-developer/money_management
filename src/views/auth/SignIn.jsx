import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import {Link} from "react-router-dom";
import {useAuthHook} from "../../hooks/auth.hook";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useEffect} from "react";

export default function SignIn() {
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
              username: yup.string().email().required(),
              password: yup.string().required().min(2),
            })
            .required()
    ),
  });
  const onSubmit = async (data) => await auth("/login/", data)

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your username and password to sign in!
        </p>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="Email"
          id="email"
          type="text"
          register={register}
          state={errors.username && "error"}
          name="username"
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          register={register}
          state={errors.password && "error"}
          name="password"
        />

        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign In
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            to="/auth/sign-up"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}

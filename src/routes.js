import React from "react";
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import SignIn from "views/auth/SignIn";
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
  MdOutlineAutorenew
} from "react-icons/md";
import SignUp from "./views/auth/SignUp";
import AutoPay from "./views/admin/autopay";
import ForgotPassword from "./views/auth/ForgotPassword";
import VerifyLink from "./views/auth/VerifyLink";
import VerifyRegisterLink from "./views/auth/VerifyRegisterLink";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Auto pay",
    layout: "/admin",
    path: "auto",
    icon: <MdOutlineAutorenew className="h-6 w-6" />,
    component: <AutoPay />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },

  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPassword />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "verify/:token",
    icon: <MdLock className="h-6 w-6" />,
    component: <VerifyLink />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/register/verify/:token",
    icon: <MdLock className="h-6 w-6" />,
    component: <VerifyRegisterLink />,
  },

];
export default routes;

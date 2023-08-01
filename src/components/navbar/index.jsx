import React from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import avatar from "assets/img/avatars/default.png";
import {useAuthHook} from "../../hooks/auth.hook";
import {useAppStore} from "../../store/index.store";
import {currency, period} from "../../contants";
import {useTransactionHook} from "../../hooks/transactions.hook";
import {BiUser} from "react-icons/bi";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  // const [darkmode, setDarkmode] = React.useState(false);

  const { darkMode, setDarkMode} = useAppStore()


  const {user,currentCurrency,setCurrency} = useAppStore()

  const {getSumTransactions} = useTransactionHook()

  const {logout} = useAuthHook()

  const handleLogout = () => logout()

  const handleClick = async (cr) => {
    await getSumTransactions(cr)
    setCurrency(cr)
  }

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[300px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <Dropdown
          button={ <span className="cursor-pointer dark:text-white dark:hover:text-white">{currentCurrency}</span>  }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              {
                Object.values( currency ).map(c => (
                    <div key={c} onClick={() => handleClick(c)} className="cursor-pointer px-2 rounded dark:text-white  hover:bg-gray-50 hover:dark:bg-gray-800">{c}</div>
                ))
              }
            </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkMode) {
              document.body.classList.remove("dark");
              setDarkMode(false);
            } else {
              document.body.classList.add("dark");
              setDarkMode(true);
            }
          }}
        >
          {darkMode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt={user?.username || ""}
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, {user?.username || ""}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                {/*<a*/}
                {/*  href=" "*/}
                {/*  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"*/}
                {/*>*/}
                {/*  Profile Settings*/}
                {/*</a>*/}
                {/*<a*/}
                {/*  href=" "*/}
                {/*  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"*/}
                {/*>*/}
                {/*  Newsletter Settings*/}
                {/*</a>*/}
                <div
                  onClick={handleLogout}
                  className="mt-3 cursor-pointer text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </div>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;

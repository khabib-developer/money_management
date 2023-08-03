/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "routes.js";
import {RxHamburgerMenu} from "react-icons/rx";
import {useAppStore} from "../../store/index.store";

const Sidebar = ({ open, onClose }) => {
  const { full, setFull} = useAppStore()

  return (
    <div
      className={`sm:none duration-175 overflow-hidden  ${!full?"w-[292px]":"w-[56px]"}  linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`px-4 mb-4 mt-[45px] flex items-center`}>
        {/*<div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">*/}
        {/* Money manage*/}
        {/*</div>*/}
        <div className="cursor-pointer" onClick={() => setFull(!full)}>
          <RxHamburgerMenu size={28} />
        </div>
      </div>
      <div className="mt-6 mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>


    </div>
  );
};

export default Sidebar;

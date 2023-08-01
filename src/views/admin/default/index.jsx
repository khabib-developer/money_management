import React, {useEffect} from "react";
import {columnsDataComplex} from "./variables/columnsData";
import Widget from "components/widget/Widget";
import ComplexTable from "views/admin/default/components/ComplexTable";
import ColumnChartCard from "./components/ColumnChartCard";
import MonthlyRevenue from "./components/monthlyRevenue";
import BarChartCard from "./components/incomeChartCard";
import {useTargetStore} from "../../../store/target.store";
import {useWalletStore} from "../../../store/wallet.store";
import {useAppStore} from "../../../store/index.store";
import prettyNum from 'pretty-num';
import {useWalletHook} from "../../../hooks/wallet.hook";
import Dropdown from "../../../components/dropdown";
import {GiWallet} from "react-icons/gi";
import {ceil} from "../../../utils";

const Dashboard = () => {
   const {targets} = useTargetStore()

   const {wallets, categories} = useWalletStore()

   const {currentCurrency} = useAppStore()

   const {totalBalance, redirectToWallet} = useWalletHook()

   useEffect(() => {
      redirectToWallet()
   }, [])

   return (
       <div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
             {/*<PieChartCard />*/}
             <ColumnChartCard/>
             <div className="flex flex-col gap-5">
                <Dropdown
                    button={
                       <Widget
                           icon={<GiWallet className="h-6 w-6"/>}
                           title={"Balance"}
                           subtitle={`${prettyNum(ceil(totalBalance()), {thousandsSeparator: ' '})} ${currentCurrency}`}
                       />
                    }
                    children={
                       <div
                           className="flex top  flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                          {
                             Object.values(wallets).map((wallet, i) => (
                                 <div key={i}
                                      className="cursor-pointer px-2 rounded dark:text-white  hover:bg-gray-50 hover:dark:bg-gray-800">
                                    {categories.find(c => c.id === wallet.category).name} - {wallet.name} - {prettyNum(wallet.balance, {thousandsSeparator: ' '})} {wallet.currency}
                                 </div>
                             ))
                          }
                       </div>
                    }
                    classNames={"py-2 top-20 w-full"}
                    animation="origin-[0%_0%] md:origin-top transition-all duration-300 ease-in-out"
                />
                <MonthlyRevenue/>
             </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
             <BarChartCard/>
             <BarChartCard is_income/>

             <ComplexTable
                 columnsData={columnsDataComplex}
                 tableData={targets.sort((a, b) => a.id - b.id).filter(target => !target.is_income)}
                 name="Outcome"
             />

             <ComplexTable
                 columnsData={columnsDataComplex}
                 tableData={targets.sort((a, b) => a.id - b.id).filter(target => target.is_income)}
                 name="Income"
                 is_income
             />

          </div>
       </div>
   );
};

export default Dashboard;

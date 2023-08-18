import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";
import {ColumnChartData} from "../../../../components/charts/ColumnBarChart";
import {useWalletHook} from "../../../../hooks/wallet.hook";
import {useWalletStore} from "../../../../store/wallet.store";
import {useTransactionHook} from "../../../../hooks/transactions.hook";
import prettyNum from "pretty-num";
import {useAppStore} from "../../../../store/index.store";
import {useTransactionsStore} from "../../../../store/transaction.store";
import {useMemo} from "react";
import {ceil} from "../../../../utils";
import {useTargetHook} from "../../../../hooks/target.hook";

const ColumnChartCard = () => {

   const { totalBalance } = useWalletHook()

   const {supposedComes} = useTargetHook()

   const {income, outcome} = useTransactionsStore()

   const {currentCurrency} = useAppStore()

   const {initial} = useTransactionsStore()

   const current = totalBalance()

   const {incomeDuringThisMonth, outcomeDuringThisMonth} = useTransactionsStore()

   const currentGraph = useMemo(() => ceil( current ), [initial, currentCurrency, income, outcome])

   const initialGraph = useMemo(() => ceil( current - incomeDuringThisMonth + outcomeDuringThisMonth ), [initial, currentCurrency])

   console.log(currentGraph, initialGraph)

   return (
       <Card extra="rounded-[20px] p-3">
          <div className="flex flex-row justify-between px-3 pt-2">
             <div>
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                   Monthly Budget
                </h4>
             </div>
          </div>

          <div className="flex flex-1 w-full items-center justify-center">
             <div className="h-[285px] w-full">
                <ColumnChartData initial={initialGraph} current={currentGraph} />
             </div>
          </div>
          <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 dark:!bg-navy-700 dark:shadow-none">
             <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                   <div className="h-2 w-2 rounded-full bg-brand-500" />
                   <p className="ml-1 text-sm font-normal text-gray-600">Initial</p>
                </div>
                <p className="mt-px text-sm font-bold text-navy-700  dark:text-white">
                   {prettyNum( initialGraph , {thousandsSeparator: ' '})} {currentCurrency}
                </p>
             </div>

             <div className="h-11 w-px bg-gray-300 dark:bg-white/10 mx-1" />

             <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                   <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
                   <p className="ml-1 text-sm font-normal text-gray-600">Current</p>
                </div>
                <p className="mt-px text-sm font-bold text-navy-700 dark:text-white">
                   {prettyNum( currentGraph, {thousandsSeparator: ' '})} {currentCurrency}
                </p>
             </div>
          </div>
       </Card>
   );
};

export default ColumnChartCard;

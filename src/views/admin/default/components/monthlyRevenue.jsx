import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";
import {useWalletHook} from "../../../../hooks/wallet.hook";
import {useTransactionHook} from "../../../../hooks/transactions.hook";
import {useAppStore} from "../../../../store/index.store";
import prettyNum from "pretty-num";
import {useTransactionsStore} from "../../../../store/transaction.store";
import {ceil} from "./index";

const MonthlyRevenue = () => {
   const { totalBalance } = useWalletHook()

   const {initial} = useTransactionsStore()

   const current = totalBalance()

   const {currentCurrency} = useAppStore()
   return (
       <Card extra="rounded-[20px] p-3 flex-1">

          <div className="flex flex-1 w-full flex-col gap-8 items-center justify-center">

             <div className=" text-navy-700 dark:text-white">
                <div className="text-3xl text-center">
                   {
                      ceil( ((current - initial) * 100 ) / (initial)  )
                   } %
                </div>
                <h5 className="text-md pt-3 font-bold ">
                   That's how much the total savings increased
                </h5>
             </div>
            <hr className="h-[1px] w-full bg-navy-700 opacity-10 dark:bg-white"/>
             <div className="text-navy-700 dark:text-white">
                <div className="text-3xl text-center">
                   {prettyNum( ceil (current - initial) , {thousandsSeparator: ' '})} {currentCurrency}
                </div>
                <h5 className="text-md pt-3 font-bold">
                   Saved this month
                </h5>
             </div>

          </div>

       </Card>
   );
};

export default MonthlyRevenue;

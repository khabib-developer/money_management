import Card from "components/card";
import BarChart from "../../../../components/charts/BarChart";
import {useTransactionHook} from "../../../../hooks/transactions.hook";
import {useTargetHook} from "../../../../hooks/target.hook";
import {useWalletHook} from "../../../../hooks/wallet.hook";
import {useTransactionsStore} from "../../../../store/transaction.store";
import {ceil} from "../../../../utils";

const BarChartCard = ({is_income}) => {
   const title = is_income ? "income" : "outcome"

   const {incomeDuringThisMonth, outcomeDuringThisMonth} = useTransactionsStore()

   const {supposedComes} = useTargetHook()

   const supposedIncome = supposedComes(true)

   const supposedOutcome = supposedComes(false)

   return (
       <Card extra="rounded-[20px] p-3">
          <div className="flex flex-row justify-between px-3 pt-2">
             <div>
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                   Monthly {title}
                </h4>
             </div>
          </div>

          <div className="flex flex-1 w-full items-center justify-center">
             <div className="h-[285px] w-full">
                <BarChart
                    title={title}
                    data={
                       is_income ?
                           [ ceil(supposedIncome) , ceil(incomeDuringThisMonth) ] :
                           [ ceil(supposedOutcome), ceil(outcomeDuringThisMonth)]
                    }

                    increased={
                       is_income ? incomeDuringThisMonth < supposedIncome
                           : supposedOutcome < supposedOutcome
                    }

                />
             </div>
          </div>
       </Card>
   );
};

export default BarChartCard;

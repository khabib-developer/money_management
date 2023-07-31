import {columnsDataTransaction,} from "./variables/columnsData";
import DevelopmentTable from "./components/DevelopmentTable";
import {useTransactionsStore} from "../../../store/transaction.store";

const Tables = ({targetId}) => {
   const {income, outcome} = useTransactionsStore()
   return (
       <div>
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
             <DevelopmentTable
                 columnsData={columnsDataTransaction}
                 transactions={outcome.sort((a, b) => b.id - a.d)}
                 targetId={targetId}
             />
             <DevelopmentTable
                 columnsData={columnsDataTransaction}
                 transactions={income.sort((a, b) => b.id - a.d)}
                 targetId={targetId}
                 is_income
             />

          </div>

       </div>
   );
};

export default Tables;

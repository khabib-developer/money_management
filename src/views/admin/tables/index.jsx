import {columnsDataTransaction,} from "./variables/columnsData";
import DevelopmentTable from "./components/DevelopmentTable";
import {useTransactionsStore} from "../../../store/transaction.store";
import {useEffect} from "react";
import {useWalletHook} from "../../../hooks/wallet.hook";
import {useTransactionHook} from "../../../hooks/transactions.hook";

const Tables = ({targetId}) => {
   const {income, outcome} = useTransactionsStore()
   const {getTransaction} = useTransactionHook()
   const {redirectToWallet} = useWalletHook()
   useEffect(() => {
      redirectToWallet()
      // getTransaction()
   }, [])
   return (
       <div>
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
             <DevelopmentTable
                 columnsData={columnsDataTransaction}
                 transactions={outcome.sort((a, b) => - Date.parse(a.transaction_date) + Date.parse(b.transaction_date))}
                 targetId={targetId}
             />
             <DevelopmentTable
                 columnsData={columnsDataTransaction}
                 transactions={income.sort((a, b) => - Date.parse(a.transaction_date) + Date.parse(b.transaction_date))}
                 targetId={targetId}
                 is_income
             />

          </div>

       </div>
   );
};

export default Tables;

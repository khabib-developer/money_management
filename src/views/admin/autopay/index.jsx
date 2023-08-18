import DevelopmentTable from "../tables/components/DevelopmentTable";
import {useEffect} from "react";
import {useTransactionsStore} from "../../../store/transaction.store";
import {useWalletHook} from "../../../hooks/wallet.hook";
import {columnsDataTransaction} from "../tables/variables/columnsData";
import AutoPayTable from "./components/table";


const AutoPay = ({targetId}) => {
   const {income, outcome} = useTransactionsStore()
   const {redirectToWallet} = useWalletHook()
   useEffect(() => {
      redirectToWallet()
   }, [])
   return (
       <div>
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
             <AutoPayTable
                 targetId={targetId}
             />
             <AutoPayTable
                 targetId={targetId}
                 is_income
             />

          </div>

       </div>
   );
};

export default AutoPay;

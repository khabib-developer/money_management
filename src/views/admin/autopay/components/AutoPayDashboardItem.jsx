import React, {useEffect, useMemo, useState} from 'react';
import {determineDifference} from "../../../../utils";
import prettyNum from "pretty-num";
import dateFormat from "dateformat";
import {BtnCom} from "../../../../components/button";
import {useTargetHook} from "../../../../hooks/target.hook";
import {useWalletStore} from "../../../../store/wallet.store";
import {Link} from "react-router-dom";

const AutoPayDashboardItem = ({item, row}) => {
   const [payAmount, setPayAmount] = useState(+item.amount - +item.paid_amount)
   const {updateAutoPay, enableToPayment} = useTargetHook()
   const {wallets} = useWalletStore()
   const handlePay = async (auto_pay) => {
      const data = {
         ...auto_pay,
         paid_amount: +payAmount + +auto_pay.paid_amount
      }
      await updateAutoPay(data, +payAmount, data.wallet.id, data.money.id)
   }
   // const enableToPay = useMemo(() => !!wallets.find(wallet => wallet.id === item.wallet.id), [item, wallets])
   useEffect(() => {
      setPayAmount(+item.amount - +item.paid_amount)
   }, [item])
   return (
       <div className={`flex align-middle text-sm font-bold px-1 rounded-md mt-2 ${ enableToPayment(item.wallet.id) ? determineDifference(item.deadline) ? "bg-red-600" :"":"bg-amber-500 py-2"  }  `}>
          <div className="flex-1 flex items-center">{item.description}</div>
          <div className="flex-1 flex items-center">{prettyNum(item.amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
          <div className="flex-1 flex items-center">{prettyNum(item.paid_amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
          <div className="flex-1 flex items-center">
             {
                enableToPayment(item.wallet.id) ? `${item.wallet.name} ${item.wallet.currency}` : <i className="text-red-600">{item.wallet.name} - deleted</i>
             }
          </div>
          <div className="flex-1 flex items-center">{dateFormat(item.deadline, "d-mm-yyyy")}</div>
          <div className="flex-1 flex items-center">
             <input className={`transparent w-full`}
                    value={payAmount}
                    onChange={event => setPayAmount(event.target.value)}
             />
          </div>
          <div className="flex-1">
             {
                enableToPayment(item.wallet.id) ?
                    <BtnCom type="button" onClick={() => handlePay(item)} className="!my-1 px-4 py-1 text-xs">{row.is_income ? "Get" : "Pay"}</BtnCom>:
                    <Link to='/admin/auto' className="underline italic">you have to change wallet</Link>
             }

          </div>
       </div>
   );
};

export default AutoPayDashboardItem;
import React, {useEffect, useState} from 'react';
import {determineDifference} from "../../../../utils";
import prettyNum from "pretty-num";
import dateFormat from "dateformat";
import {BtnCom} from "../../../../components/button";
import {useTargetHook} from "../../../../hooks/target.hook";

const AutoPayDashboardItem = ({item, row}) => {
   const [payAmount, setPayAmount] = useState(+item.amount - +item.paid_amount)
   const {updateAutoPay} = useTargetHook()
   const handlePay = async (auto_pay) => {
      const data = {
         ...auto_pay,
         paid_amount: +payAmount + +auto_pay.paid_amount
      }
      await updateAutoPay(data, +payAmount)
   }
   useEffect(() => {
      setPayAmount(+item.amount - +item.paid_amount)
   }, [item])
   return (
       <div
          className={`flex align-middle text-sm font-bold px-1 rounded-md mt-2 ${determineDifference(item.deadline) && "bg-red-600"}`}>
          <div className="flex-1 flex items-center">{item.description}</div>
          <div
              className="flex-1 flex items-center">{prettyNum(item.amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
          <div
              className="flex-1 flex items-center">{prettyNum(item.paid_amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
          <div
              className="flex-1 flex items-center">{item.wallet.name} {item.wallet.currency}</div>
          <div className="flex-1 flex items-center">{dateFormat(item.deadline, "d-mm-yyyy")}</div>
          <div className="flex-1 flex items-center">
             <input className={`transparent w-full`}
                    value={payAmount}
                    onChange={event => setPayAmount(event.target.value)}
             />
          </div>
          <div className="flex-1">
             <BtnCom type="button" onClick={() => handlePay(item)}
                     className="!my-1 px-4 py-1 text-xs">{row.is_income ? "Get" : "Pay"}</BtnCom>
          </div>
       </div>
   );
};

export default AutoPayDashboardItem;
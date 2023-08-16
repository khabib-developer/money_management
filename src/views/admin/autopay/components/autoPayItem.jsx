import prettyNum from "pretty-num";
import dateFormat from "dateformat";
import React from "react";


export const AutoPayItem = ({item}) => {
   return (
       <div className="flex pt-2">
          <div className="flex-1 text-sm">{item.description}</div>
          <div className="flex-1 text-sm">{prettyNum(item.amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
          <div className="flex-1 text-sm">{item.target.name}</div>
          <div className="flex-1 text-sm">{item.wallet.name}</div>
          <div className="flex-1 text-sm">{dateFormat(item.deadline, "mm-d-yyyy")}</div>
       </div>
   );
}

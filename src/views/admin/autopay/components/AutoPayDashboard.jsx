import React from "react";
import AutoPayDashboardItem from "./AutoPayDashboardItem";

export const AutoPayDashboard = ({ row}) => {

   return (
       <>
          <div className="flex text-xs text-gray-600">
             <div className="flex-1">Description</div>
             <div className="flex-1">Amount</div>
             <div className="flex-1">{row.is_income ? "Got" : "Paid"}</div>
             <div className="flex-1">Wallet</div>
             <div className="flex-1">Deadline</div>
             <div className="flex-1">{row.is_income ? "Get" : "Pay"}</div>
             <div className="flex-1">Description</div>
          </div>
          {
             row.auto_pays.sort((a, b) => +a.id - +b.id).map((item, i) => <AutoPayDashboardItem item={item} row={row} key={i} />)
          }
       </>
   )
}
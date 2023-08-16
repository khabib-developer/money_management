import React from 'react';
import prettyNum from "pretty-num";
import dateFormat from "dateformat";
const TransactionListItem = ({transaction}) => {
   return (
       <div className="flex pt-2">
          <div className="flex-1 text-sm">{transaction.description}</div>
          <div className="flex-1 text-sm">{prettyNum(transaction.amount, {thousandsSeparator: ' '})} {transaction.money.currency}</div>
          <div className="flex-1 text-sm">{transaction.money.name}</div>
          <div className="flex-1 text-sm">{transaction.wallet.name}</div>
          <div className="flex-1 text-sm">{dateFormat(transaction.deadline, "mm-d-yyyy")}</div>
       </div>
   );
};

export default TransactionListItem;
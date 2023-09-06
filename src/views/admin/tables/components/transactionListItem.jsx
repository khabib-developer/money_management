import React from 'react';
import prettyNum from "pretty-num";
import dateFormat from "dateformat";

const TransactionListItem = ({transaction}) => {
   return (
       <div className="flex pt-2">
          <div className="flex-1 text-sm">{transaction.description}</div>
          <div
              className="flex-1 text-sm">
             {prettyNum(transaction.amount, {thousandsSeparator: ' '})} {transaction.wallet.currency}
          </div>
          <div className="flex-1 text-sm">
             {transaction.money?transaction.money.name:<span>Exchange money from another wallet</span>}
             {
                (transaction.money&&(transaction.money.name!=="Exchange money from another wallet" && transaction.money.name!=="Exchange money to another wallet"))
                &&
             transaction.money.is_deleted ?
              <span> - <i>deleted</i></span> : ""}</div>
          <div className="flex-1 text-sm">{transaction.wallet.name}{!transaction.wallet.active ?
              <span> - <i>deleted</i></span> : ""}</div>
          <div className="flex-1 text-sm">{dateFormat(transaction.transaction_date, "dd-mm-yyyy")}</div>
       </div>
   );
};

export default TransactionListItem;
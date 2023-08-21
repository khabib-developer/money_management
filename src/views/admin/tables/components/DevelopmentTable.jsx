import Card from "components/card";
import React, {useEffect, useMemo, useState} from "react";
import {useWalletStore} from "../../../../store/wallet.store";
import {useTargetStore} from "../../../../store/target.store";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAppStore} from "../../../../store/index.store";
import TransactionListItem from "./transactionListItem";
import {useTransactionHook} from "../../../../hooks/transactions.hook";
import {BtnCom} from "../../../../components/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DevelopmentTable = ({transactions, is_income, targetId}) => {
   const {wallets} = useWalletStore()

   const [startDate, setStartDate] = useState(new Date());

   const {targets} = useTargetStore()

   const {setError} = useAppStore()

   const {addTransaction} = useTransactionHook()

   const title = is_income ? 'Income' : 'Outcome'

   const currentTargets = useMemo(() => targets.filter(target => is_income ? target.is_income : !target.is_income), [targets])

   const {
      register,
      handleSubmit,
      watch,
      formState: {errors},
      reset
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 amount: yup.number().required().min(0),
                 description: yup.string().required(),
                 money: yup.number().required(),
                 wallet: yup.number().required()
              })
              .required()
      ),
   });

   useEffect(() => {
      if (Object.keys(errors).length) {
         setError("Complete all fields")
      }
   }, [errors])

   const handleAddTransaction = async (data) => {
      const wallet = wallets.find(w => +w.id === +data.wallet)
      const target = targets.find(t => +t.id === +data.money)
      if(target.currency !== wallet.currency) {
         console.log('error')
         setError("currencies doesn't match")
         return
      }
      if(!target.is_income && (+data.amount > +wallet.balance)) return setError("amount is too large")
      await addTransaction({...data, transaction_date: startDate}, wallet, target)
      reset()
   }
   return (
       <Card extra={"w-full h-full p-4"}>
          <div className="relative flex items-center justify-between">
             <div className="text-xl font-bold pb-2 text-navy-700 dark:text-white">
                {title} Table
             </div>
          </div>

          <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
             <div className="flex flex-col">
                <div className="flex">
                   <div className="flex-1">Description</div>
                   <div className="flex-1">Amount</div>
                   <div className="flex-1">Target</div>
                   <div className="flex-1">Wallet</div>
                   <div className="flex-1">Date</div>
                </div>
                <form onSubmit={handleSubmit(handleAddTransaction)} className="flex gap-1">
                   <div className="flex flex-1">
                      <input {...register("description")} className="my-2 text-sm outline-0 w-full transparent"
                             placeholder="description"/>
                   </div>
                   <div className="flex flex-1">
                      <input {...register("amount")} className="my-2  text-sm outline-0 w-full transparent"
                             placeholder="amount"/>
                   </div>
                   <div className="flex flex-1">
                      <select {...register("money")} className="transparent text-sm w-4/5 outline-0" defaultValue={targetId?targetId : null}>
                         {
                            currentTargets.map((target, i) => (
                                <option key={i} value={target.id}>{target.name} {target.currency}</option>)
                            )
                         }
                      </select>
                   </div>
                   <div className="flex flex-1 items-center gap-1">
                      <select {...register("wallet")} className="transparent text-sm w-4/5 outline-0">
                         {
                            wallets.map((wallet, i) =>
                                <option key={i}
                                        value={wallet.id}>{wallet.name} - {wallet.balance} {wallet.currency}</option>)
                         }
                      </select>
                   </div>
                   <div className="flex flex-1">
                      {/*<input defaultValue={new Date().toISOString().slice(0, 10)} {...register("transaction_date")}*/}
                      {/*       className="p-1 my-2 outline-0 w-full transparent text-xs" placeholder="date" type="date"/>*/}
                      <DatePicker dateFormat="dd.MM.yyyy" selected={startDate} onChange={(date) => setStartDate(date)} className="p-1 my-2 outline-0 w-full transparent text-xs" />
                      <BtnCom type="submit" className="text-xs !my-2">Create</BtnCom>
                   </div>
                </form>
                {
                   transactions.map((transaction, i) => <TransactionListItem transaction={transaction} key={i} />)
                }
             </div>
          </div>
       </Card>
   );
}

export default DevelopmentTable;

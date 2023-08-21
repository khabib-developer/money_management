import Card from "components/card";
import React, {useEffect, useMemo, useState} from "react";
import {useWalletStore} from "../../../../store/wallet.store";
import {useTargetStore} from "../../../../store/target.store";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAppStore} from "../../../../store/index.store";
import {useTargetHook} from "../../../../hooks/target.hook";
import {AutoPayItem} from "./autoPayItem";
import {BtnCom} from "../../../../components/button";
import DatePicker from "react-datepicker";

const AutoPayTable = ({is_income, targetId}) => {
   const {targets} = useTargetStore()

   const {setError} = useAppStore()

   const {wallets} = useWalletStore()

   const {addAutoPay} = useTargetHook()

   const [startDate, setStartDate] = useState(new Date());

   const title = is_income ? 'Income' : 'Outcome'

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
                 amount: yup.number().required().min(1),
                 paid_amount: yup.number().required().min(0),
                 description: yup.string().required(),
                 money: yup.string().required(),
                 wallet: yup.string().required(),
              })
              .required()
      ),
   });

   useEffect(() => {
      if (Object.keys(errors).length) {
         setError("Complete all fields correctly")
      }
   }, [errors])

   const currentTargets = targets.filter(target => is_income ? target.is_income : !target.is_income)

   const allAutoPays = currentTargets.reduce((acc, target) => {
      if (target.auto_pays) {
         return [...acc, ...target.auto_pays];
      }
      return acc;
   }, []);

   const defaultAmount = useMemo(() => targetId ? targets.find(target => +target.id === +targetId).target_money : 0, [targetId, targets])

   const handleAddAutoPay = async (data) => {
      await addAutoPay({...data, deadline: startDate}, wallets.find(wallet => +wallet.id === +data.wallet), targets.find(target => +target.id === +data.money))
      reset()
   }
   return (
       <Card extra={"w-full h-full p-4"}>
          <div className="relative flex items-center justify-between">
             <div className="text-xl font-bold pb-2 text-navy-700 dark:text-white">
                {title} autopay
             </div>
          </div>

          <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
             <div className="flex flex-col">
                <div className="flex">
                   <div className="flex-1">Name</div>
                   <div className="flex-1">Amount</div>
                   <div className="flex-1">{!is_income?"Paid":"Got"} amount</div>
                   <div className="flex-1">{!is_income?"Pay":"Get"}</div>
                   <div className="flex-1">Target</div>
                   <div className="flex-1">Wallet</div>
                   <div className="flex-1">Date</div>
                </div>
                <form onSubmit={handleSubmit(handleAddAutoPay)} className="flex gap-1">
                   <div className="flex flex-1">
                      <input {...register("description")} className="my-2 text-sm outline-0 w-full transparent"
                             placeholder="description"/>
                   </div>
                   <div className="flex flex-1">
                      <input {...register("amount")} className="my-2  text-sm outline-0 w-full transparent"
                             placeholder="amount" defaultValue={defaultAmount} />
                   </div>

                   <div className="flex flex-1">
                      <input {...register("paid_amount")} className="my-2  text-sm outline-0 w-full transparent"
                             placeholder="paid_amount" defaultValue={0} />
                   </div>
                   <div className="flex flex-1">

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
                   <div className="flex flex-1">
                      <select {...register("wallet")} className="transparent text-sm w-4/5 outline-0">
                         {
                            wallets.map((wallet, i) =>
                                <option key={i}
                                        value={wallet.id}>{wallet.name} - {wallet.balance} {wallet.currency}</option>)
                         }
                      </select>
                   </div>
                   <div className="flex flex-1 items-center justify-around">
                      {/*<input defaultValue={new Date().toISOString().slice(0, 10)} {...register("deadline")}*/}
                      {/*       className="p-1 my-2 outline-0 w-full transparent text-xs" placeholder="date" type="date"/>*/}
                      <DatePicker dateFormat="dd.MM.yyyy" selected={startDate} onChange={(date) => setStartDate(date)} className="p-1 my-2 outline-0 w-full transparent text-xs" />

                      <BtnCom className="!my-1 text-xs">Create</BtnCom>
                   </div>
                </form>

                {
                   allAutoPays.sort((a, b) => a.id - b.id).map((item, i) => <AutoPayItem key={i} item={item} />)
                }
             </div>
          </div>
       </Card>
   );
}

export default AutoPayTable;



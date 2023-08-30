import prettyNum from "pretty-num";
import dateFormat from "dateformat";
import React, {useEffect} from "react";
import {MdDelete} from "react-icons/md";
import {useForm} from "react-hook-form";
import {useTargetHook} from "../../../../hooks/target.hook";
import {determineDifference} from "../../../../utils";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAppStore} from "../../../../store/index.store";
import {BtnCom} from "../../../../components/button";
import {AiFillEdit} from "react-icons/ai";
import {useWalletStore} from "../../../../store/wallet.store";
import {useTargetStore} from "../../../../store/target.store";


export const AutoPayItem = ({item, currentTargets}) => {

   const {deleteAutoPay, updateAutoPay, enableToPayment} = useTargetHook()

   const {wallets} = useWalletStore()

   const {setError} = useAppStore()

   const {register,handleSubmit,formState: {errors},reset} = useForm({
      resolver: yupResolver(
          yup
              .object({
                 amount: yup.number().required().min(1),
                 paid_amount: yup.number().required().min(0),
                 description: yup.string().required(),
                 wallet: yup.string().required(),
                 money: yup.string().required()
              })
              .required()
      ),
   });

   useEffect(() => {
      if (Object.keys(errors).length) {
         setError("Complete all fields correctly")
      }
   }, [errors])

   const onSubmit = async (data) => {
      await updateAutoPay(
          {
             ...item,
             description: data.description,
             amount: data.amount,
             paid_amount: data.paid_amount + item.paid_amount,
          },
          data.paid_amount,
          data.wallet,
          data.money
      )
   }

   const handleDelete = async () => {
      await deleteAutoPay(item.id, item.money.id)
   }

   return (
       <form
           className={`flex ${enableToPayment(+item.wallet.id) ? determineDifference(item.deadline) ? " bg-red-600 " : "" : "bg-amber-500" } rounded-md mt-1 items-center px-1 `}
           onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 text-sm"><input {...register('description')} className={`transparent ${errors.description&&"!bg-red-400"}`}
                                                 defaultValue={item.description}/></div>
          <div className="flex-1 text-sm flex"><input {...register('amount')} className={`transparent w-1/2 ${errors.amount&&"!bg-red-400"}`}
                                                      defaultValue={prettyNum(item.amount, {thousandsSeparator: ' '})}/> {item.wallet.currency}
          </div>
          <div
              className="flex-1 text-sm">{prettyNum(item.paid_amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
          <div className="flex-1 text-sm flex"><input {...register('paid_amount')} className={`transparent  w-1/2 ${errors.paid_amount&&"!bg-red-400"} `}
                                                      placeholder="pay amount"
                                                      defaultValue={'0'}/> {item.wallet.currency}
          </div>
          <div className="flex-1 text-sm">
             <select {...register("money")} className={`transparent text-sm w-4/5 outline-0 ${errors.description&&"!bg-red-400"}`} defaultValue={item.money.id}>
                {
                   currentTargets.sort((a, b) => a.id - b.id).map((target, i) => (
                       <option key={i} value={target.id}>{target.name} {target.currency}</option>)
                   )
                }
             </select>
          </div>

          <div className="flex-1 text-sm">
             <select {...register("wallet")} className={`transparent text-sm w-4/5 outline-0 ${errors.wallet&&"!bg-red-400"} `} defaultValue={item.wallet.id}>
                <option value="" className="italic text-red-600">deleted</option>
                {
                   wallets.sort((a, b) => a.id - b.id).map((wallet, i) => <option key={i}
                                                      value={wallet.id}>{wallet.name} - {wallet.balance} {wallet.currency}</option>)
                }
             </select>
          </div>
          <div className="flex-1 text-sm flex items-center justify-between">
             <span className="w-1/2">{dateFormat(item.deadline, "d-mm-yyyy")}</span>
             <BtnCom type="submit" className="text-xs !my-1 flex-1"><AiFillEdit/></BtnCom>
             <MdDelete onClick={handleDelete} className="cursor-pointer flex-1"/></div>
       </form>
   );
}

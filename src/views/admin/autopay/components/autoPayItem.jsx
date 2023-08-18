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


export const AutoPayItem = ({item}) => {

   const {deleteAutoPay, updateAutoPay} = useTargetHook()

   const {setError} = useAppStore()

   const {
      register,
      handleSubmit,
      formState: {errors},
      reset
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 amount: yup.number().required().min(1),
                 paid_amount: yup.number().required().min(0),
                 description: yup.string().required(),
              })
              .required()
      ),
   });

   useEffect(() => {
      if (Object.keys(errors).length) {
         setError("Complete all fields correctly")
      }
   }, [errors])

   const onSubmit = (data) => {

      updateAutoPay(item.money, {...item, paid_amount: data.paid_amount + item.paid_amount, money: item.money.id, wallet: item.wallet.id}, item.wallet)
   }

   const handleDelete = async () => {
      await deleteAutoPay(item.id, item.money.id)
   }

   return (
       <form className={`flex  ${determineDifference(item.deadline) && "py-2 bg-red-600 px-2 rounded-md"}  items-center px-1 `} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 text-sm"><input {...register('description')} className="transparent" defaultValue={item.description} /></div>
          <div className="flex-1 text-sm"><input {...register('amount')} className="transparent" defaultValue={prettyNum(item.amount, {thousandsSeparator: ' '})} /> {item.wallet.currency}</div>
          <div className="flex-1 text-sm">{prettyNum(item.paid_amount, {thousandsSeparator: ' '})}  {item.wallet.currency}</div>
          <div className="flex-1 text-sm"><input {...register('paid_amount')} className="transparent" placeholder="pay amount" defaultValue={'0'} /> {item.wallet.currency}</div>
          <div className="flex-1 text-sm">{item.money.name} {item.money.currency}</div>
          <div className="flex-1 text-sm">{item.wallet.name} {item.wallet.currency} <input type="submit" className="hidden"/></div>
          <div className="flex-1 text-sm flex items-center justify-between">{dateFormat(item.deadline, "d-mm-yyyy")} <MdDelete onClick={handleDelete} className="cursor-pointer" /></div>
       </form>
   );
}

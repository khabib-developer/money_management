import React, {useEffect} from 'react';
import {currency} from "../../../../contants";
import {useTargetHook} from "../../../../hooks/target.hook";
import {useAppStore} from "../../../../store/index.store";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useTargetStore} from "../../../../store/target.store";
import {BtnCom} from "../../../../components/button";

const AddTarget = ({is_income}) => {
   const {addOrUpdateTargets} = useTargetHook()

   const {targets} = useTargetStore()

   const {user, setError} = useAppStore()

   const {
      register,
      handleSubmit,
      formState: {errors},
      reset
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 name: yup.string().required().min(2),
                 target_money: yup.number().required().min(0),
              })
              .required()
      ),
   });

   useEffect(() => {
      if (Object.keys(errors).length) {
         setError("Complete all fields correctly")
      }
   }, [errors])

   const handleAdd = async (data) => {
      const currentTargets = targets.filter(target => is_income ? target.is_income : !target.is_income)
      const highestOrder = currentTargets.length?Math.max(...currentTargets.map(target => target.order)) + 1:0
      if (targets.find(target => target.name === data.name)) return setError("Target already exists with the same name")
      await addOrUpdateTargets({...data, is_income: Boolean(is_income), user: user.id}, "POST", "", highestOrder)
      reset({name: "", target_money: ""})
   }

   return (
       <form onSubmit={handleSubmit(handleAdd)} className="flex">
          <div className="flex-1 text-sm items-center font-bold text-navy-700 flex w-1/5">
             <input {...register("name")} className={`my-2 ${errors.name&&"!bg-red-400"} w-full outline-0 transparent text-navy-700 dark:text-white`}
                    placeholder="name"/></div>
          <div className={`flex-1 text-sm items-center font-bold text-navy-700 flex w-1/5 items-center`}>
             <input {...register("target_money")}
                    className={`w-4/5 my-2 outline-0 ${errors.target_money&&"!bg-red-400"} transparent text-navy-700 dark:text-white`}
                    placeholder="amount"/>
             <select {...register("currency")}
                     className={`text-xs outline-0 pt-1 transparent h-fit text-navy-700 dark:text-white ${errors.currency&&"!bg-red-400"} `}>
                {
                   Object.values(currency).map((cr, i) => <option key={i} value={cr}>{cr}</option>)
                }
             </select>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <BtnCom type="submit" className="flex-1 text-xs !w-min">Create</BtnCom>
       </form>
   );
};

export default AddTarget;
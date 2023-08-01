import React, {useEffect, useRef, useState} from 'react';
import prettyNum from "pretty-num";
import {BtnCom} from "../../../../components/button";
import {useTargetHook} from "../../../../hooks/target.hook";
import {useAppStore} from "../../../../store/index.store";
import {useForm} from "react-hook-form";
import {useTargetStore} from "../../../../store/target.store";
import {MdDelete} from "react-icons/md";

const UpdateTarget = ({row, columns, setTargetId}) => {
   const {addOrUpdateTargets, deleteTarget} = useTargetHook()
   const {user} = useAppStore()
   const {targets} = useTargetStore()

   useEffect(() => {
      document.addEventListener("click", event => {
         if(!event.target.classList.contains(`money__target__${row.id}`)) setShow(true)
      })
   }, [])


   const {
      register,
      handleSubmit,
      formState: {errors},
      reset
   } = useForm();

   const handleUpdate = async (data) => {
      const target = targets.find(t => t.id === row.id)
      if(target) {
         await addOrUpdateTargets({
            name: data.name,
            target_money: data.target_money,
            currency: target.currency,
            is_income: target.is_income,
            user: target.user
         }, "PUT", `${target.id}/`)
      }
   }

   const handleDelete = async () => await deleteTarget(row.id)

   const [show, setShow] = useState(true)

   return (
       <form onSubmit={handleSubmit(handleUpdate)} className="flex ">
          {
             columns.map((column, index) => {

                let data = <input {...register(`name`)} className="w-full transparent" defaultValue={row[column.accessor]}/>

                if (column.accessor === "target_money")
                   data = <div className="flex">
                      <div className="relative w-3/5">
                         <input {...register(`target_money`)} className={`transparent w-full ${show&&"opacity-0"} money__target__${row.id}`} defaultValue={row["target_money"]}/>
                         {show&&<span onClick={() => setShow(false)} className={`absolute left-0 money__target__${row.id}`}> {prettyNum(row["target_money"], {thousandsSeparator: ' '})}  </span>}
                      </div>
                       {row.currency}
                </div>

                if (column.accessor === "actually")
                   data = <span>{prettyNum(row["actually"], {thousandsSeparator: ' '})} {row.currency}</span>

                if (column.accessor === "difference")
                   data =
                       <span>{prettyNum(row.target_money - row["actually"], {thousandsSeparator: ' '})} {row.currency}</span>

                if (column.accessor === "add")
                   data = <div className="w-full flex gap-2 items-center h-full">
                      <BtnCom type="button" className="!m-0 text-xs lg:text-md !px-3 !py-1"
                              onClick={() => setTargetId(row.id)}>Add</BtnCom>
                      <div className="cursor-pointer" onClick={handleDelete}>
                        <MdDelete size={20} color="red" />
                      </div>
                   </div>;

                return (
                    <div key={index} className="flex-1 flex text-sm items-center font-bold text-navy-700 dark:text-white">
                       {data}
                    </div>)
             })
          }
          <input type="submit" className="hidden"/>
       </form>
   );
};

export default UpdateTarget;
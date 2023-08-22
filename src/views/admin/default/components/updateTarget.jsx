import React, {useEffect, useRef, useState} from 'react';
import prettyNum from "pretty-num";
import {BtnCom} from "../../../../components/button";
import {useTargetHook} from "../../../../hooks/target.hook";
import {useAppStore} from "../../../../store/index.store";
import {useForm} from "react-hook-form";
import {useTargetStore} from "../../../../store/target.store";
import {MdDelete, MdOutlineAutorenew} from "react-icons/md";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {IoAdd} from "react-icons/io5";
import {determineDifference} from "../../../../utils";
import {AiFillEdit} from "react-icons/ai";
import {AutoPayDashboard} from "../../autopay/components/AutoPayDashboard";

const UpdateTarget = ({row, columns, setTargetId, setTransaction}) => {
   const {addOrUpdateTargets, deleteTarget, summOfAutoPays} = useTargetHook()
   const {user} = useAppStore()
   const {targets} = useTargetStore()

   useEffect(() => {
      document.addEventListener("click", event => {
         if (!event.target.classList.contains(`money__target__${row.id}`)) setShow(true)
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
      if (target) {
         await addOrUpdateTargets({
            name: data.name,
            target_money: data.target_money || target.target_money,
            currency: target.currency,
            is_income: target.is_income,
            user: user.id
         }, "PUT", target.id)
      }
   }

   const handleDelete = async () => await deleteTarget(row.id)

   const [show, setShow] = useState(true)

   const handleOpenAutoPay = () => {
      setTransaction(false)
      setTargetId(row.id)
   }

   const handleOpenTransaction = () => {
      setTransaction(true)
      setTargetId(row.id)
   }

   const isDeadline = (auto_pays) => {
      if (auto_pays)
         return !!auto_pays.find(item => determineDifference(item.deadline))
   }

   return (
       <form onSubmit={handleSubmit(handleUpdate)} className="flex">
          <AccordionItem className={`!w-full !border-none ${!(row.auto_pays && row.auto_pays.length) && 'py-2'}`}>
             <div className={`flex ${isDeadline(row.auto_pays) && "bg-red-600 !text-navy-900 rounded-md"}  px-2`}>

                {
                   columns.map((column, index) => {

                      let data = <>
                         <input {...register(`name`)} className="w-full transparent"
                                defaultValue={row[column.accessor]}/>
                         {
                            (row.auto_pays && row.auto_pays.length) ?
                                <AccordionButton className="!w-[8px] flex justify-center">
                                   <AccordionIcon/>
                                </AccordionButton> : <></>
                         }
                      </>

                      if (column.accessor === "target_money")
                         data = <div className="flex">
                            <div className="relative w-3/5">
                               <input {...register(`target_money`)}
                                      className={`transparent w-full ${show && "opacity-0"} money__target__${row.id}`}
                                      defaultValue={summOfAutoPays(row)}
                                      disabled={row.auto_pays.length}
                               />
                               {show && <span onClick={() => setShow(false)}
                                              className={`absolute left-0 money__target__${row.id}`}> {prettyNum(summOfAutoPays(row), {thousandsSeparator: ' '})}  </span>}
                            </div>
                            {row.currency}
                         </div>

                      if (column.accessor === "actually")
                         data =
                             <span>{prettyNum(row["actually"], {thousandsSeparator: ' '})} {row.currency}</span>

                      if (column.accessor === "difference")
                         data =
                             <span>{prettyNum(row.target_money - row["actually"], {thousandsSeparator: ' '})} {row.currency}</span>

                      if (column.accessor === "add")
                         data = <div className="w-full flex gap-2 items-center h-full">
                            <BtnCom type="button" className="!m-0 text-xs lg:text-md !px-2 !bg-amber-500 !py-1"
                                    onClick={handleOpenAutoPay}>
                               <MdOutlineAutorenew/>
                            </BtnCom>
                            <BtnCom type="button" className="!m-0 text-xs lg:text-md !px-1 !py-0"
                                    onClick={handleOpenTransaction}>
                               <IoAdd className="h-5 w-5"/>
                            </BtnCom>
                            <BtnCom type="submit" className="!m-0 text-xs lg:text-md !px-2 !py-1">
                               <AiFillEdit/>
                            </BtnCom>
                            <BtnCom type="button" onClick={handleDelete}
                                    className="!m-0 text-xs !bg-red-600 lg:text-md !px-2 !py-1">
                               <MdDelete/>
                            </BtnCom>
                         </div>;

                      return (
                          <div key={index}
                               className={`flex-1 flex text-sm items-center font-bold  ${isDeadline(row.auto_pays) && "!text-navy-900"} ${row.auto_pays && row.auto_pays.length ? "!italic" : "text-navy-700"} dark:text-white`}>
                             {data}
                          </div>)
                   })
                }

             </div>

             {
                (row.auto_pays && row.auto_pays.length) ? <AccordionPanel pb={4}> <AutoPayDashboard row={row} /> </AccordionPanel> : <></>
             }

          </AccordionItem>

       </form>
   );
};

export default UpdateTarget;


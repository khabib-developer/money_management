import React, {useEffect, useState} from 'react';
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

const UpdateTarget = ({row, columns, setTargetId, setTransaction}) => {
   const {addOrUpdateTargets, deleteTarget} = useTargetHook()
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
            target_money: data.target_money,
            currency: target.currency,
            is_income: target.is_income,
            user: target.user
         }, "PUT", `${target.id}/`)
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

   const isDeadline = (autoPay) => {
      if(autoPay)
         return !!autoPay.find(item => determineDifference(item.deadline))
   }

   return (
       <form onSubmit={handleSubmit(handleUpdate)} className="flex">
          <AccordionItem className={`!w-full !border-none ${!(row.autoPay && row.autoPay.length) && 'py-2'}`}>
             <div className="flex">

                {
                   columns.map((column, index) => {

                      let data = <>
                         <input {...register(`name`)} className="w-full transparent"
                                defaultValue={row[column.accessor]}/>
                         {
                             row.autoPay && row.autoPay.length &&
                             <AccordionButton className="!w-[8px] flex justify-center">
                                <AccordionIcon/>
                             </AccordionButton>
                         }
                      </>

                      if (column.accessor === "target_money")
                         data = <div className="flex">
                            <div className="relative w-3/5">
                               <input {...register(`target_money`)}
                                      className={`transparent w-full ${show && "opacity-0"} money__target__${row.id}`}
                                      defaultValue={row["target_money"]}/>
                               {show && <span onClick={() => setShow(false)}
                                              className={`absolute left-0 money__target__${row.id}`}> {prettyNum(row["target_money"], {thousandsSeparator: ' '})}  </span>}
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
                            <BtnCom type="button" className="!m-0 text-xs lg:text-md !px-2 !py-1"
                                    onClick={handleOpenTransaction}>
                               <IoAdd/>
                            </BtnCom>
                            <BtnCom type="button" onClick={handleDelete} className="!m-0 text-xs !bg-red-600 lg:text-md !px-2 !py-1">
                               <MdDelete />
                            </BtnCom>
                         </div>;

                      return (
                          <div key={index}
                               className={`flex-1 flex text-sm items-center font-bold ${isDeadline(row.autoPay) && "bg-red-600 !text-navy-900" }  ${row.autoPay && row.autoPay.length ? "!text-amber-500" : "text-navy-700"} dark:text-white`}>
                             {data}
                          </div>)

                   })
                }

             </div>

             {
                 row.autoPay && row.autoPay.length && <AccordionPanel pb={4}>
                     <div className="flex text-xs text-gray-600">
                        <div className="flex-1">Description</div>
                        <div className="flex-1">Amount</div>
                        <div className="flex-1">Paid</div>
                        <div className="flex-1">Deadline</div>
                        <div className="flex-1">Pay</div>
                        <div className="flex-1">Description</div>
                     </div>
                    {
                       row.autoPay.map((item, i) =>
                           <div key={i} className={`flex align-middle text-sm font-bold px-1 rounded-md mt-2 ${determineDifference(item.deadline) && "bg-red-600"}`}>
                              <div className="flex-1 flex items-center">{item.description}</div>
                              <div
                                  className="flex-1 flex items-center">{prettyNum(item.amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
                              <div
                                  className="flex-1 flex items-center">{prettyNum(item.paid_amount, {thousandsSeparator: ' '})} {item.wallet.currency}</div>
                              <div className="flex-1 flex items-center">{item.deadline}</div>
                              <div className="flex-1 flex items-center">
                                 <input {...register(`target_money`)}
                                        className={`transparent w-full `}
                                        defaultValue={item.amount - item.paid_amount}/>
                              </div>
                              <div className="flex-1">
                                 <BtnCom className="mt-0 px-4 py-1 text-xs">Pay</BtnCom>
                              </div>

                           </div>)
                    }

                 </AccordionPanel>
             }

             <input type="submit" className="hidden"/>
          </AccordionItem>

       </form>
   );
};

export default UpdateTarget;


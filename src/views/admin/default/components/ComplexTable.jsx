import Card from "components/card";
import React, {useEffect, useMemo, useState} from "react";
import AddTarget from "./addTarget";
import UpdateTarget from "./updateTarget";
import {Accordion} from "@chakra-ui/react";
import AddTransactionOrAutoPay from "./addTransactionOrAutoPay";
import OrderableList from "./orderableList";
import {useTargetHook} from "../../../../hooks/target.hook";

const ComplexTable = ({columnsData, tableData, name, is_income}) => {
   const columns = useMemo(() => columnsData, [columnsData]);

   useEffect(() => {
      console.log(tableData.map(el => el.order), is_income)
   }, [tableData])

   const { updateOrder } = useTargetHook()

   const setCurrentTargets = (updatedTargets) => {
      updateOrder(updatedTargets.map(item => ({id: item.id, order:item.order})), is_income).then(() => {})
   }

   const [targetId, setTargetId] = useState(null)

   const [transaction, setTransaction] = useState(false)

   return (
       <Card extra={"w-full h-full px-3 lg:px-6 pb-6 sm:overflow-x-auto"}>
          <div className="relative flex items-center justify-between pt-4">
             <div className="text-xl font-bold text-navy-700 dark:text-white">
                {name}
             </div>
          </div>
          <div className="mt-8 xl:overflow-hidden">
             <div className="w-full">
                <div className="flex">
                   {
                      columns.map((column, i) => <div className="flex-1" key={i}>
                         <div className="text-xs text-gray-600">
                            {column.Header.toLocaleUpperCase()}
                         </div>
                      </div>)
                   }
                </div>
                <div className="flex flex-col gap-2 mt-2">
                   <AddTarget is_income={is_income}/>
                   <Accordion allowMultiple>

                      <OrderableList data={tableData.sort((a, b) => a.order - b.order)} setData={setCurrentTargets}>
                         {(provider, setActiveItem, setActive, active, activeItem) => {
                            return (
                                <UpdateTarget
                                    setTargetId={setTargetId}
                                    setTransaction={setTransaction} row={provider}
                                    setActiveItem={setActiveItem}
                                    setActive={setActive}
                                    active={active}
                                    activeItem={activeItem}
                                    columns={columns}/>
                                )
                         }}
                      </OrderableList>
                   </Accordion>
                </div>
             </div>
          </div>
          <AddTransactionOrAutoPay targetId={targetId} setTargetId={setTargetId} transaction={transaction}/>
       </Card>
   );
};

export default ComplexTable;

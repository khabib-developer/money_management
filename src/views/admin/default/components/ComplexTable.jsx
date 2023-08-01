import Card from "components/card";
import React, {useMemo, useState} from "react";
import AddTransaction from "./addTransaction";
import AddTarget from "./addTarget";
import UpdateTarget from "./updateTarget";

const ComplexTable = ({columnsData, tableData, name, is_income}) => {
   const columns = useMemo(() => columnsData, [columnsData]);
   const data = useMemo(() => tableData, [tableData]);

   const [targetId, setTargetId] = useState(null)

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
                   <AddTarget is_income={is_income} />
                   {
                      data.map((row, i) => <UpdateTarget key={i} setTargetId={setTargetId} row={row} columns={columns} />)
                   }
                </div>
             </div>
          </div>
          <AddTransaction targetId={targetId} setTargetId={setTargetId}/>
       </Card>
   );
};

export default ComplexTable;

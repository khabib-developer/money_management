import Chart from "react-apexcharts";
import React from "react";
import {useAppStore} from "../../store/index.store";
const options = (categories) => ({
   plotOptions: {
      bar: {
         columnWidth: '45%',
         distributed: true,
      }
   },
   colors: ["#4318FF", "#6AD2FF"],
   xaxis: {
      categories: categories
   },
   dataLabels: {
      enabled: false
   },
   legend: {
      show: false
   },
   labels: {
      style: {
         colors: ["#4318FF", "#6AD2FF"],
         fontSize: '12px',
         className: 'text-lg font-bold text-navy-700 dark:text-white'
      }
   }
})

const series = (data) => {
   return [
      {
         name: "Balance",
         data
      }
   ]
}

export const ColumnChartData = ({initial, current}) => {
   const {currentCurrency} = useAppStore()
   return <Chart
       options={options([`${initial} ${currentCurrency}`, `${current} ${currentCurrency}`])}
       series={series([initial, current])}
       type="bar"
       width="100%"
       height="100%"
   />
}
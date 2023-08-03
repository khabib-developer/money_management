import Chart from "react-apexcharts";
import React, {useEffect, useRef} from "react";
import {useAppStore} from "../../store/index.store";
const options = (categories, darkMode, full) => ({
   plotOptions: {
      bar: {
         columnWidth: full?'45%':"46%",
         distributed: true,
      }
   },
   colors: ["#4318FF", "#6AD2FF"],
   xaxis: {
      categories: categories,
   },
   yaxis: {
      show: false,
   },
   tooltip: {
      theme: 'dark',
      x: {
         show: false
      },
      y: {
         title: {
            formatter: function () {
               return ''
            }
         }
      }
   },
   theme: {
      mode: darkMode? "dark":"light",
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
   const {currentCurrency, darkMode, full} = useAppStore()
   const ref = useRef()
   useEffect(() => {
      if(ref&&ref.current) {
         console.log(ref.current)
         ref.current.chart.parentResizeHandler()
      }
   }, [full])
   return <Chart
       ref={ref}
       options={options([`${initial} ${currentCurrency}`, `${current} ${currentCurrency}`], darkMode)}
       series={series([initial, current])}
       type="bar"
       width="100%"
       height="100%"
   />
}
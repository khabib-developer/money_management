import Chart from "react-apexcharts";
import React, {useEffect, useRef} from "react";
import {useAppStore} from "../../store/index.store";
import prettyNum from "pretty-num";
import {ceil} from "../../utils";
const options = (categories, darkMode) => ({
   plotOptions: {
      bar: {
         columnWidth: '45%',
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
   dataLabels: {
      formatter: function (val, opt) {
         return prettyNum(ceil(val), {thousandsSeparator: ' '})
      },
   },
   tooltip: {
      theme: 'dark',
      x: {
         show: false
      },
      y: {
         title: {
            formatter: function (opt, val) {
               return ''
            }
         }
      }
   },
   theme: {
      // mode: darkMode? "dark":"light",
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
         ref.current.chart.windowResizeHandler()
      }
   }, [full])
   return <Chart
       ref={ref}
       options={
         options(
             [`${prettyNum(ceil(initial), {thousandsSeparator: ' '})} ${currentCurrency}`, `${prettyNum(ceil(current), {thousandsSeparator: ' '})} ${currentCurrency}`],
             darkMode
         )
      }
       series={series([initial, current])}
       type="bar"
       width="100%"
       height="100%"
   />
}
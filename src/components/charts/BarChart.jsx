import React, {useEffect, useRef} from 'react';
import Chart from 'react-apexcharts';
import {useAppStore} from "../../store/index.store";
import prettyNum from "pretty-num";
import {ceil} from "../../utils";

const series = (data) => {
   return [{
      data: data
   }]
}

const options = (title, increased, darkMode) => ({
   chart: {
      type: 'bar',
      width: "100%"
   },
   plotOptions: {
      bar: {
         barHeight: '45%',
         horizontal: true,
      }
   },
   colors: !increased?["#4318FF"]:["#fca600"],
   dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
         colors: ['#fff']
      },
      dropShadow: {
         enabled: true
      },
      formatter: function (val, opt) {
         return opt.w.globals.labels[opt.dataPointIndex] + ":  " + prettyNum(ceil(val), {thousandsSeparator: ' '})
      },
      offsetX: 0,
   },
   xaxis: {
      categories: ["Supposed", "Actual"],
   },
   yaxis: {
      show: false,
      labels: {
         show: false
      }
   },
   title: {
      text: title,
      align: 'center',
      floating: true
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
      // mode: darkMode? "dark":"light",
   }
})

const BarChart = ({title, data, increased}) => {
   const {darkMode, full} = useAppStore()
   const ref = useRef()
   useEffect(() => {
      if(ref&&ref.current) {
         ref.current.chart.windowResizeHandler()
      }
   }, [full])
   return (
       <Chart
           ref={ref}
           options={options(title, increased, darkMode)}
           series={series(data)}
           type="bar"
           width="100%"
           height="100%"
       />
   )
}

export default BarChart;

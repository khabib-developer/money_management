import React from 'react';
import Chart from 'react-apexcharts';

const series = (data) => {
   return [{
      data: data
   }]
}

const options = (title, increased) => ({
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
   colors: !increased?["#4318FF"]:["#bd0000"],
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
         return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
   },
   xaxis: {
      categories: ["Supposed", "Actual"],
   },
   yaxis: {
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
   }
})

const BarChart = ({title, data, increased}) => {
   return (
       <Chart
           options={options(title, increased)}
           series={series(data)}
           type="bar"
           width="100%"
           height="100%"
       />
   )
}

export default BarChart;

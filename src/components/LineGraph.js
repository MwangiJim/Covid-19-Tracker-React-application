import React from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral';

const options = {
  legend:{
      display:false,
  },
  elements:{
      point:{
          radius:0,
      },
  },
  maintainAspectRatio:false,
  tooltips:{
      mode:'index',
      intersect:false,
      callbacks:{
          label:function(tooltipItem ,data){
              return numeral(tooltipItem.value).format("+0,0");
          },
      },
  },
  scales:{
      xAxes:[
          {
              type:'time',
              time:{
                  format:"MM//DD/YY",
                  tooltipFormat:'ll',
              },
          },
      ],
      yAxes:[
          {
              gridLines:{
                  display:false,
              },
              ticks:{
                  callback:function(value,index,values){
                      return numeral(value).format('0a')
                  },
              },
          },
      ],
  }
}
function LineGraph() {

    let[data,setData] = React.useState({})
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    React.useEffect(()=>{
        const fetchData = async()=>{
           await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
           .then((response)=>response.json())
           .then((data)=>{
                console.log(data)
                const chartData = BuildchartData(data)
                console.log(chartData);
                setData(chartData)
           })
        }
        fetchData()
    },[])
    const BuildchartData =(data,casesType='cases')=>{
         const chartData = [];
         let LastDataPoint;

         for(let date in data.cases){
             if(LastDataPoint){
              const newDataPoint = {
                  x:date,
                  y:data['cases'][date] - LastDataPoint
              }
              chartData.push(newDataPoint)
             }
             LastDataPoint = data[casesType][date];   
         }
         return chartData;
         
    }
  return (
    <div>
        I AM A GRAPH
         {/* {data?.length > 0 &&(
             <Line
             data = {{
                 datasets:[{
                     data:data,
                     backgroundColor:'rgba(204,16,52,0.5)',
                     borderColor:'@CC1034'
                 }]
             }}
             options = {options}
           />
         )} */}
    </div>
  )
}

export default LineGraph
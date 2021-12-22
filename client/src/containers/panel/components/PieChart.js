import React,{useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([props.completas,props.incompletas])
      const [options,setOptions]=useState({
        chart: {
            width: 380,
            type: props.type,
          },
          labels: props.labels,
          title: {
            text: props.text,
          
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
         
            }
          }
        
      }) 
    
        

    return (
       
   

        <Chart height={240} width={"100%"} options={options} series={series} type={props.type} />

    )
}

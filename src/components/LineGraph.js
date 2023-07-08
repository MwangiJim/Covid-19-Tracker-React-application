import React, { useRef,useState } from 'react'
import * as d3 from 'd3'

function LineGraph() {
   const svgRef = useRef()
   let [data]= useState([
    [9000,0],[20000,1], [25000,2],[40000,3],[79000,4], [60000,5],
      [130000,6], [180000,7], [185000,8],[175000,9],[210000,10],[150000,11],
      [9000,12],[20000,13], [25000,14],[40000,15],[79000,16], [60000,17],
      [130000,18], [180000,19], [185000,20],[175000,21],[210000,22],[150000,22],
      [60000,23],
      [130000,24], [180000,25], [185000,26],[175000,27],[210000,28],[150000,29],
  ])
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    React.useEffect(()=>{
       const width = 260
       const height = 200

       const svg = d3.select(svgRef.current)
       .attr('height',height)
       .attr('width',width)
       .style('overflow','visible')
       .attr('transform',`translate(${width - 230},0)`)
       //setup scales
       const xScale = d3.scaleLinear()
       .domain([0,31])
       .range([0,width])

       const yScale = d3.scaleLinear()
       .domain([d3.max(data,function(d){
        return d[0]
       }),0])
       .range([0,height])

       //setup axes
       svg.append('g')
       .call(d3.axisBottom(xScale))
       .attr('transform',`translate(0,${height})`)

       svg.append('g')
       .call(d3.axisLeft(yScale))
       //setup line generator
       const linegenerator  = d3.line()
       .x((d)=>xScale(d[1]))
       .y((d)=>yScale(d[0])).curve(d3.curveCardinal)
       //append line
       svg.append('path')
       .data([data])
       .join('line')
       .attr('d',linegenerator)
       .style('fill','none')
       .style('stroke','red')
       .style('stroke-width',2)
    },[data])
   
  return (
    <svg ref={svgRef}></svg>
  )
}

export default LineGraph
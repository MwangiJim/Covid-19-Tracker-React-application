import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

function Table({countries}) {
  return (
    <TableData>
        {countries.map(({country,cases})=>{
            return(
              <tr>
                <td>{country}</td>
                <td><strong>{numeral(cases).format('0,0')}</strong></td>
               </tr>
            )
        })}
    </TableData>
  )
}

export default Table

let TableData = styled.div`
 max-height:60vh;
 overflow-y:auto;
 margin-top:20px;
 color:#6a5d5d;
 tr:nth-of-type(odd){
     background-color:#f3f2f8;
 }
 tr{
     display:flex;
     justify-content:space-between;
 }
 td{
     padding:0.5rem;
 }
 ::-webkit-scrollbar{
     background-color:#fff;
     width:5px;
     border-radius:8px;
 }
 ::-webkit-scrollbar-track{
     width:5px;
     border-radius:8px;
     background-color:#f4f4f4;
 }
 ::-webkit-scrollbar-thumb{
     width:5px;
     border-radius:8px;
     background-color:#333;
 }
`
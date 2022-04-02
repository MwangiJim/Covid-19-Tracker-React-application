import React from 'react'
import styled from 'styled-components'

function InfoBox({boxcolor,title,cases,total,...props}) {
  return (
    <Container onClick={props.onClick} style={boxcolor}>
       <h2>{title}</h2>
       <h4>+{cases}</h4>
       <p>{total} Total</p>
    </Container>
  )
}

export default InfoBox
let Container = styled.div`
 height:120px;
 width:100%;
 box-shadow:5px 5px 12px #000;
 border-radius:10px;
 margin:0 10px;
 padding: 20px 12px;
 background-color:#fff;
 cursor:pointer;
 h2{
     font-weight:600;
     font-size:22px;
     color:gray;
 }
 h4{
   color:#f44336;
     margin:15px 0;
     font-size:28px;
 }
 p{
     font-weight:500;
     color:gray;
 }
`
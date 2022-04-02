import './App.css';
import React from 'react';
import Home from './components/Home';

function App() {
 let[Color,setColor] = React.useState(false)
 const ChangeColor =()=>{
    setColor((prevColor)=>!prevColor)
 }
 let ButtonColor = {
  backgroundColor:Color?'#fff':"#000"
 }
 let SpanColor = {
   marginLeft:Color?"49px":"",
   backgroundColor:Color?"#000":"#fff"
 }
 let AppColor = {
   backgroundColor:Color?"#000":"#fff",
   color:Color?"#fff":"#000"
 }
 let BoxStyles = {
   backgroundColor:Color?"#000":"#fff",
   boxShadow:Color?"5px 5px 12px #fff":"5px 5px 12px #000",
   color:Color?"#fff":"#f4f4f4"
 }
 let LiveTable = {
   backgroundColor:Color?"#000":"#fff",
   color:Color?"#fff":"#000",
   boxShadow:Color?"5px 5px 12px #fff":"5px 5px 12px #000"
 }
 let SelectColor = {
   backgroundColor:Color?"#000":"#fff",
   color:Color?"#fff":"#000"
 }
  return (
    <div className="App" style={AppColor}>
      <Home
       Handler = {ChangeColor}
       spanColor = {SpanColor}
       btnColor = {ButtonColor}
       boxstyles = {BoxStyles}
       livetable = {LiveTable}
       selectcolor = {SelectColor}
      />
    </div>
  );
}

export default App;

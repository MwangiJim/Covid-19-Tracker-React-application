import React from 'react'
import { FormControl, MenuItem, Select } from '@mui/material'
import InfoBox from './InfoBox'
import Map from './Map'
import styled from 'styled-components'
import { useEffect } from 'react'
import Table from './Table'
import { prettyPrintStat, sortData } from './util'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css";

function Home(props) {
  let[Country,setCountry] = React.useState([ ]);
  let[country,setcountry] = React.useState('worldwide');
  let [countryInfo,setCountryInfo] = React.useState({});
  let [tableData,setTableData] = React.useState([])
  let[mapCenter,setMapCenter] = React.useState({lat:34.80746,lng:-40.4796})
  let [mapZoom,setmapZoom] = React.useState(3)
  let[mapCountries,setmapCountries] = React.useState([])
  let[casesType,setCasesType] = React.useState("cases")
  React.useEffect(()=>{
       const getCountryData = async()=>{
          await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response)=>response.json())
          .then((data)=>{
              const countries = data.map((country)=>{
                  return (
                      {
                          name:country.country,
                          value:country.countryInfo.iso2
                      }
                  )
              })
              const sortedData = sortData(data);
              setCountry(countries)
              setTableData(sortedData)
              setmapCountries(data);
          })
       }
       getCountryData();
  },[])
useEffect(()=>{
  fetch('https://disease.sh/v3/covid-19/all')
  .then((response)=>response.json())
  .then((data)=>{
    setCountryInfo(data);
  })
},[])
 async function HandleInput(event){
      const countryCode = event.target.value;
      console.log("YOOOOOO >>>>>>",countryCode)
      setcountry(countryCode)
      const url = countryCode === 'worldwide'?
      'https://disease.sh/v3/covid-19/all':
      `https://disease.sh/v3/covid-19/countries/${countryCode}`


      await fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
          setcountry(countryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat,data.countryInfo.long])
          setmapZoom(4)
      })
       //https://disease.sh/v3/covid-19/all
      //https://disease.sh/v3/covid-19/countries/[COUNTRYCODE]
  }
  //console.log('Country Info>>>>',countryInfo)
  return (
  <Container>
     <LeftContainer>
     <Navbar>
        <h1>COVID-19 TRACKER</h1>
        <button onClick={props.Handler} style={props. btnColor }><span style={props.spanColor}></span></button>
        <FormControl className='dropdown' style = {props.selectcolor}>
            <Select
             variant='outlined'
             value={country}
             onChange={HandleInput}
            >
                <MenuItem value="worldwide">WorldWide</MenuItem>
                {
                    Country.map((count)=>{
                        return (
                            <MenuItem value ={count.value}>{count.name}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    </Navbar>
     <Row>
        <InfoBox
        boxcolor= {props.boxstyles}
         onClick ={(e=> setCasesType('cases'))}
          title= 'Coronavirus Cases'
          cases = {prettyPrintStat(countryInfo.todayCases)}
          total = {prettyPrintStat(countryInfo.cases)}
        />
        <InfoBox
         boxcolor= {props.boxstyles}
           onClick ={(e=> setCasesType('recovered'))}
         title= 'Recovered'
         cases = {prettyPrintStat(countryInfo.todayRecovered)}
         total = {prettyPrintStat(countryInfo.recovered)}
        />
        <InfoBox
         boxcolor= {props.boxstyles}
           onClick ={(e=> setCasesType('deaths'))}
         title= 'Deaths'
         cases = {prettyPrintStat(countryInfo.todayDeaths)}
         total = {prettyPrintStat(countryInfo.deaths)}
        />
     </Row>
     <Map
     casesType={casesType}
      center={mapCenter}
      zoom={mapZoom}
      CovidCountries = {mapCountries}
     />
    </LeftContainer>
    <RightContainer style={props.livetable}>
       <h3>Live Cases By Country</h3>TableColor
       <Table countries = {tableData}/>
       <h3>WorldWide new cases</h3>
       <LineGraph/>
   </RightContainer>
  </Container>
  )
}

export default Home

let Container = styled.div`
 display:flex;
 justify-content:space-between;
 @media(max-width:990px){
   flex-direction:column;
 }
`
let LeftContainer = styled.div`
 flex-basis:73%;
 @media(max-width:990px){
   flex-basis:100%;
 }
`
let RightContainer = styled.div`
 flex-basis:23%;
 height:max-content;
 background-color:#fff;
 box-shadow:5px 5px 12px #000;
 border-radius:10px;
 padding:10px;
 @media(max-width:990px){
  flex-basis:100%;
}
`
let Row = styled.div`
 display:flex;
 justify-content:center;
 align-items:center;
 margin-bottom:10px;
`
let Navbar = styled.div`
 display:flex;
 justify-content:space-between;
 align-items:center;
 margin-bottom:20px;
 h1{
   color:#f44336;
 }
 button{
   width:80px;
   height:31px;
   border-radius:25px;
   outline:none;
   border:none;
   background-color:#000;
   cursor:pointer;
   span{
     transition:0.5s;
     background-color:#fff;
     height:28px;
     width:28px;
     border-radius:50%;
     display:block;
     margin-left:3px;
   }
 }
 `
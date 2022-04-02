import React from 'react'
import styled from 'styled-components'
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { showDataOnMap } from './util';

function Map({CovidCountries,casesType,center,zoom}) {
  return (
   <Container>
      <LeafletMap center={center} zoom={zoom}>
          <TileLayer
           url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* loop through countries and draw */}
          {showDataOnMap(CovidCountries,casesType)}
      </LeafletMap>
   </Container>
  )
}

export default Map
let Container = styled.div`
 height:500px;
 background-color:#fff;
 padding:1rem;
 border-radius:20px;
 margin-top:16px;
 box-shadow:0 0 8px -4px rgba(0,0,0,0.5);
 .leaflet-container{
   height:100%;
 }
`
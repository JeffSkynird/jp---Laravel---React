import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map() {
  return (
    <MapContainer center={[-3.2520207, -79.9754121]} zoom={50} style={{height:500}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[-3.2520207, -79.9754121]}>
    <Popup>
     Allan Poma - tendido 2
    </Popup>
  </Marker>
  <Marker position={[-3.2525218, -79.9754121]}>
    <Popup>
      Jefferson Poma - tendido 3
    </Popup>
  </Marker>
</MapContainer>
  )
}

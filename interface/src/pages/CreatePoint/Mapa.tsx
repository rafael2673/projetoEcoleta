import React, { useState, useEffect } from 'react';
import {Map, Marker, TileLayer} from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

const Mapa = () => {
  const [inicialPosition, setInicialPosition] = useState<[number, number]>([0, 0]);
  const [selectedMap, setSelectedMap] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setInicialPosition([latitude, longitude]);
    })
  }, [])

  function handleMapClick(e: LeafletMouseEvent){
    setSelectedMap([e.latlng.lat, e.latlng.lng]);
  }
  localStorage.setItem('selectedPosition', JSON.stringify(selectedMap))
  return (
    <Map center={inicialPosition} zoom = {15} onClick={handleMapClick}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={selectedMap}></Marker>
    </Map>
  )
}

export default Mapa;
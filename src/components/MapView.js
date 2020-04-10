import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import Marker from './Marker';
import { Map, Marker, Circle, Popup, TileLayer } from 'react-leaflet';

import { CaseContext } from './../context/CaseContext';
import { divIcon } from 'leaflet';
/*
id: 0
country: "Afghanistan"
country_code: "AF"
country_population: 29121286
province: ""
last_updated: "2020-04-10T11:15:16.967541Z"
coordinates:
  latitude: "33.0"
  longitude: "65.0"
__proto__: Object
latest:
  confirmed: 484
  deaths: 15
  recovered: 0
*/

const icon_purple = divIcon({
  className: 'marker-icon--purple',
  iconSize: [32, 32],
});
const icon_red = divIcon({ className: 'marker-icon--red', iconSize: [32, 32] });
const icon_orange = divIcon({
  className: 'marker-icon--orange',
  iconSize: [32, 32],
});
const icon_green = divIcon({
  className: 'marker-icon--green',
  iconSize: [32, 32],
});

function MapView(props) {
  const position = [51.505, -0.09];
  const { caseData } = useContext(CaseContext);
  const markers = caseData.map((data) => (
    <Marker
      key={data.id}
      position={[data.coordinates.latitude, data.coordinates.longitude]}
      icon={
        data.latest.confirmed >= 100000
          ? icon_purple
          : data.latest.confirmed >= 10000
          ? icon_red
          : data.latest.confirmed >= 1000
          ? icon_orange
          : icon_green
      }
      // icon={
      //   data.latest.confirmed > 100000
      //     ? {
      //         className: 'marker-icon--purple',
      //         iconSize: [
      //           data.latest.confirmed / 100,
      //           data.latest.confirmed / 100,
      //         ],
      //       }
      //     : ''
      // }
    >
      hello
    </Marker>
  ));

  return (
    <Map center={position} zoom={3} style={{ height: '100vh', zIndox: '0' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
    </Map>
  );
}

export default MapView;

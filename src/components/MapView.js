import React, { useContext, useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
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
  iconSize: [40, 40],
});
const icon_red = divIcon({
  className: 'marker-icon--red',
  iconSize: [32, 32],
});
const icon_orange = divIcon({
  className: 'marker-icon--orange',
  iconSize: [24, 24],
});
const icon_green = divIcon({
  className: 'marker-icon--green',
  iconSize: [16, 16],
});

function MapView(props) {
  const { caseData, clickMarker, position, country } = useContext(CaseContext);
  const markers = caseData.map((data) => (
    <Marker
      key={data.id}
      position={[data.coordinates.latitude, data.coordinates.longitude]}
      icon={
        data.latest.confirmed >= 100000
          ? divIcon({
              className:
                data.id == (country && country.id)
                  ? 'marker-icon--purple active'
                  : 'marker-icon--purple',
              iconSize: [40, 40],
            })
          : data.latest.confirmed >= 10000
          ? divIcon({
              className:
                data.id == (country && country.id)
                  ? 'marker-icon--red active'
                  : 'marker-icon--red',
              iconSize: [32, 32],
            })
          : data.latest.confirmed >= 1000
          ? divIcon({
              className:
                data.id == (country && country.id)
                  ? 'marker-icon--orange active'
                  : 'marker-icon--orange',
              iconSize: [25, 25],
            })
          : divIcon({
              className:
                data.id == (country && country.id)
                  ? 'marker-icon--green active'
                  : 'marker-icon--green',
              iconSize: [16, 16],
            })
      }
      onClick={(e) => clickMarker(e.target, data.id)}
    ></Marker>
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

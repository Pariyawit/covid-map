import React, { useContext, useState, useRef } from 'react';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
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

const divIconObject = (data, country, zoom) => {
  const size = zoom / 3;

  if (data.latest.confirmed >= 100000) {
    return {
      className:
        data.key === (country && country.key)
          ? 'marker-icon marker-icon--dark-purple active'
          : 'marker-icon marker-icon--dark-purple',
      iconSize: [48 * size, 48 * size],
    };
  }
  if (data.latest.confirmed >= 10000) {
    return {
      className:
        data.key === (country && country.key)
          ? 'marker-icon marker-icon--purple active'
          : 'marker-icon marker-icon--purple',
      iconSize: [40 * size, 40 * size],
    };
  } else if (data.latest.confirmed >= 1000) {
    return {
      className:
        data.key === (country && country.key)
          ? 'marker-icon marker-icon--red active'
          : 'marker-icon marker-icon--red',
      iconSize: [32 * size, 32 * size],
    };
  } else if (data.latest.confirmed >= 100) {
    return {
      className:
        data.key === (country && country.key)
          ? 'marker-icon marker-icon--orange active'
          : 'marker-icon marker-icon--orange',
      iconSize: [24 * size, 24 * size],
    };
  } else {
    return {
      className:
        data.key === (country && country.key)
          ? 'marker-icon marker-icon--green active'
          : 'marker-icon marker-icon--green',
      iconSize: [16 * size, 16 * size],
    };
  }
};

function MapView(props) {
  const {
    caseData,
    clickMarker,
    position,
    country,
    setCountry,
    setShowInfo,
    setShowSearch,
    setShowAbout,
    zoom,
    setZoom,
  } = useContext(CaseContext);

  const mapEl = useRef(null);

  const handleZoom = (e) => {
    // console.log(mapEl.current.leafletElement._zoom);
    setZoom(mapEl.current.leafletElement._zoom);
    if (mapEl.current.leafletElement._zoom < 2) {
      setZoom(2);
    }
  };

  const clickMap = () => {
    setShowInfo(false);
    setShowSearch(false);
    setCountry(null);
    setShowAbout(false);
  };

  const markers = caseData
    .filter((data) => {
      if (data.level === 'all') return true;
      if (zoom < 4 && data.level === 'country') return true;
      if (zoom >= 4 && data.level === 'province') return true;
      return false;
    })
    .map((data) => (
      <Marker
        key={data.key}
        position={[data.coordinates.latitude, data.coordinates.longitude]}
        icon={divIcon(divIconObject(data, country, zoom))}
        onClick={(e) => clickMarker(data.key)}
      ></Marker>
    ));

  return (
    <Map
      center={position}
      zoom={zoom}
      style={{ height: '100vh', zIndox: '0' }}
      onClick={clickMap}
      zoomControl={false}
      ref={mapEl}
      onZoomEnd={handleZoom}
      options={{ minZoom: 2 }}
      maxBounds={[
        [-75, -220],
        [85, 220],
      ]}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
      <ZoomControl position='topright' />
    </Map>
  );
}

export default MapView;

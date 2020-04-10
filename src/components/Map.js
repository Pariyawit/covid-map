import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

function Map(props) {
  const tmp = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={tmp.center}
        defaultZoom={tmp.zoom}
      >
        <Marker lat={59.955413} lng={30.337844} postcode='2010' />
      </GoogleMapReact>
    </div>
  );
}

export default Map;

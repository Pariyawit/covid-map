import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
// import {GoogleApiWrapper} from 'google-maps-react';

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
        bootstrapURLKeys={{ key: 'AIzaSyDYIeTv6Uyp1p0s_WRDZizp6Zp2ZoXYe-I' }}
        defaultCenter={tmp.center}
        defaultZoom={tmp.zoom}
      >
        <Marker lat={59.955413} lng={30.337844} postcode='2010' />
      </GoogleMapReact>
    </div>
  );
}

export default Map;

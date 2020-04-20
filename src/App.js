import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './styles/App.scss';

import { CaseContext } from './context/CaseContext';

import { statesData } from './data/statesData';

import MapView from './components/MapView';
import Search from './components/Search';
import Info from './components/Info';
import About from './components/About';

function App() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const { setCaseData } = useContext(CaseContext);

  useEffect(() => {
    const url1 = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
    const url2 =
      'https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs';

    axios
      .all([axios.get(url1), axios.get(url2)])
      .then(
        axios.spread((res, resUS) => {
          const cases = Array.from(res.data.locations);
          let tmp = [];

          cases.forEach((item) => {
            item.level = 0;
            item.key = item.id + item.country + item.province;
            if (item.country === 'US') item.level = 1;
            tmp = [...tmp, item];
          });

          const casesUS = Array.from(resUS.data.locations);
          casesUS.forEach((item) => {
            //new state
            const index = tmp.map((e) => e.province).indexOf(item.province);
            if (index === -1) {
              item.county = '';
              item.level = 2;
              item.key = item.id + item.country + item.province;
              const stateItem = statesData.find(
                (e) => e.name === item.province
              );
              if (stateItem) {
                item.coordinates.latitude = stateItem.latitude;
                item.coordinates.longitude = stateItem.longitude;
                tmp = [...tmp, item];
              }
            } // existing state
            else {
              // console.log(item);
              tmp[index].latest.confirmed += item.latest.confirmed;
              tmp[index].latest.deaths += item.latest.deaths;
              tmp[index].latest.recovered += item.latest.recovered;
            }
          });
          setCaseData(
            tmp.sort((a, b) => b.latest.confirmed - a.latest.confirmed)
          );
        })
      )
      .catch((error) => console.log(error));
  }, [setCaseData]);
  return (
    <div className='App'>
      <Search />
      <Info />
      <MapView />
      <About />
    </div>
  );
}

export default App;

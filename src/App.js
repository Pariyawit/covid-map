import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './styles/App.scss';

import { CaseContext } from './context/CaseContext';

import { statesData } from './data/statesData';
import { centroidsData } from './data/centroidsData';

import MapView from './components/MapView';
import Search from './components/Search';
import Info from './components/Info';
import About from './components/About';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
          let list = [];

          cases
            // .filter((item) => item.country === 'Australia')
            .forEach((item) => {
              if (item.province === '') {
                item.level = 'all';
                item.key = item.id + item.country;
                if (item.country === 'US') item.level = 'country';
                list = [...list, item];
              } else {
                item.level = 'province';
                item.key = item.id + item.country + item.province;
                list = [...list, item];

                let tmpItem = {
                  ...item,
                  latest: {
                    ...item.latest,
                  },
                  coordinates: {
                    ...item.coordinates,
                  },
                  province: '',
                  level: 'country',
                  key: item.id + item.country,
                };
                const index = list
                  .map((e) => e.province + e.country)
                  .indexOf(tmpItem.country);
                if (index === -1) {
                  const countryItem = centroidsData.find(
                    (e) => e.ISO3136 === item.country_code
                  );
                  if (countryItem) {
                    tmpItem.coordinates.latitude = countryItem.LAT;
                    tmpItem.coordinates.longitude = countryItem.LONG;
                    list = [...list, tmpItem];
                  }
                } // existing state
                else {
                  list[index].latest.confirmed += tmpItem.latest.confirmed;
                  list[index].latest.deaths += tmpItem.latest.deaths;
                  list[index].latest.recovered += tmpItem.latest.recovered;
                }
              }
            });

          const casesUS = Array.from(resUS.data.locations);
          casesUS.forEach((item) => {
            //new state
            const index = list.map((e) => e.province).indexOf(item.province);
            if (index === -1) {
              item.county = '';
              item.level = 'province';
              item.key = item.id + item.country + item.province;
              const stateItem = statesData.find(
                (e) => e.name === item.province
              );
              if (stateItem) {
                item.coordinates.latitude = stateItem.latitude;
                item.coordinates.longitude = stateItem.longitude;
                list = [...list, item];
              }
            } // existing state
            else {
              // console.log(item);
              list[index].latest.confirmed += item.latest.confirmed;
              list[index].latest.deaths += item.latest.deaths;
              list[index].latest.recovered += item.latest.recovered;
            }
          });

          //remove duplicate country
          list.forEach((data, index) => {
            if (data.level === 'country') {
              list.forEach((c) => {
                if (c.country === data.country && c.level === 'all') {
                  list.splice(index, 1);
                }
              });
            }
          });

          setCaseData(
            list.sort((a, b) => b.latest.confirmed - a.latest.confirmed)
          );
          setLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [setCaseData]);
  return (
    <div className='App'>
      <Loader loading={loading} error={error} />
      <Search />
      <Info />
      <MapView />
      <About />
    </div>
  );
}

export default App;

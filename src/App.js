import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './styles/App.scss';

import { CaseContext } from './context/CaseContext';

import MapView from './components/MapView';
import Search from './components/Search';
import Info from './components/Info';

function App() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const { caseData, setCaseData, setSearchItems } = useContext(CaseContext);

  useEffect(() => {
    axios
      .get('http://coronavirus-tracker-api.herokuapp.com/v2/locations')
      .then((res) => {
        const cases = Array.from(res.data.locations);
        console.log(cases);
        let tmp = [];
        cases.forEach((item) => {
          tmp = [...tmp, item];
        });
        setCaseData(
          tmp.sort((a, b) => b.latest.confirmed - a.latest.confirmed)
        );
      })
      .catch((error) => console.log(error));
  }, [setCaseData]);
  return (
    <div className='App'>
      <Search />
      <Info />
      <MapView />
    </div>
  );
}

export default App;

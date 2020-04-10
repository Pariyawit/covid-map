import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/App.scss';

import { CaseContext } from './context/CaseContext';

import Map from './components/Map';
import Search from './components/Search';
import Info from './components/Info';

function App() {
  const { setCaseData } = useContext(CaseContext);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DATA_NSW_GOV_AU_API)
      .then((res) => {
        // console.log(res);
        const records = res.data.result.records;
        setCaseData(records);
        console.log(records);
      })
      .catch((error) => console.log(error));
  }, [setCaseData]);

  return (
    <div className='App'>
      <Search />
      {/* <Info /> */}
      <Map />
    </div>
  );
}

export default App;

import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/App.scss';

import { CaseContext } from './context/CaseContext';

import Map from './components/Map';
import Search from './components/Search';
import Info from './components/Info';

function App() {
  const context = useContext(CaseContext);

  useEffect(() => {
    axios
      .get(
        '/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29',
        'https://jsonplaceholder.typicode.com/todos'
        // {
        //   mode: 'no-cors',
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
        //   },
        //   'Access-Control-Allow-Credentials': true,
        //   credentials: 'same-origin',
        // }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='App'>
      <Search />
      {/* <Info /> */}
      <Map />
    </div>
  );
}

export default App;

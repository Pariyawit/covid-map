import React from 'react';
import './styles/App.scss';

import Map from './components/Map';
import Search from './components/Search';
import Info from './components/Info';

function App() {
  return (
    <div className='App'>
      <Search />
      {/* <Info /> */}
      <Map />
    </div>
  );
}

export default App;

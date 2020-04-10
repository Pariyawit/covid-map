import React from 'react';

export default function Search() {
  return (
    <div className='search-wrapper'>
      <div className='search card' style={{ zIndex: 1000 }}>
        <input type='text' placeholder='Search'></input>
      </div>
    </div>
  );
}

import React, { useContext } from 'react';
import { CaseContext } from './../context/CaseContext';

export default function Info() {
  const { country, showInfo } = useContext(CaseContext);
  return country && showInfo ? (
    <div className='info card' style={{ zIndex: 1000 }}>
      <h3 className='info__title'>
        {country.province && `${country.province}, `}
        {country.country}
      </h3>
      <p className='info__description'>
        Confirmed: {country.latest.confirmed.toLocaleString()}
        <br />
        Deaths: {country.latest.deaths.toLocaleString()}
      </p>
    </div>
  ) : (
    ''
  );
}

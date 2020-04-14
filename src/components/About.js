import React, { useState, useContext } from 'react';
import { CaseContext } from './../context/CaseContext';

function About() {
  const { showAbout, setShowAbout } = useContext(CaseContext);

  const handleClick = () => {
    setShowAbout((prevShowAbout) => !prevShowAbout);
  };

  return (
    <>
      <div
        className='card about about__icon'
        style={{ zIndex: '999' }}
        onClick={handleClick}
      >
        ?
      </div>
      <div
        className={`card about about__detail  ${
          showAbout ? 'about__detail--active' : ''
        }`}
        style={{ zIndex: '999' }}
        onClick={handleClick}
      >
        <h1>About</h1>
        <p>
          This application gets data from{' '}
          <a
            href='https://github.com/ExpDev07/coronavirus-tracker-api'
            target='_blank'
            rel='noopener noreferrer'
          >
            Coronavirus Tracker API
          </a>{' '}
          in which retrieves data from multiple sources
        </p>
      </div>
    </>
  );
}

export default About;

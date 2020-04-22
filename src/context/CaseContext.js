import React, { useState } from 'react';
import L from 'leaflet';

const CaseContext = React.createContext();

function scale(zoom) {
  return 256 * Math.pow(2, zoom);
}

function pixelScale(pixel, zoom) {
  return pixel / scale(zoom);
}

function CaseContextProvider(props) {
  const [caseData, setCaseData] = useState([]);
  const [position, setPosition] = useState([35.9, 14.37]);
  const [country, setCountry] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [zoom, setZoom] = useState(3);

  const clickMarker = (key) => {
    console.log(key);
    const data = caseData.find((data) => data.key === key);

    const newLat =
      parseFloat(data.coordinates.latitude) - pixelScale(25000, zoom);

    // console.log(newLat, data.coordinates.latitude);
    setPosition([newLat, data.coordinates.longitude]);
    setCountry(data);
    setShowInfo(true);
    setShowAbout(false);
    if (!(zoom < 4) && data.level === 'country') setZoom(3);
    if (!(zoom >= 4) && data.level === 'province') setZoom(4);
  };

  const context = {
    caseData,
    setCaseData,
    clickMarker,
    position,
    country,
    setCountry,
    showInfo,
    showSearch,
    setShowSearch,
    setShowInfo,
    showAbout,
    setShowAbout,
    zoom,
    setZoom,
  };

  return (
    <CaseContext.Provider value={context}>
      {props.children}
    </CaseContext.Provider>
  );
}

export { CaseContextProvider, CaseContext };

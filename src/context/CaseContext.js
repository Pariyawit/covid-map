import React, { useState } from 'react';

const CaseContext = React.createContext();

function CaseContextProvider(props) {
  const [caseData, setCaseData] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [country, setCountry] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const clickMarker = (id) => {
    const data = caseData.find((data) => data.id == id);
    setPosition([data.coordinates.latitude, data.coordinates.longitude]);
    setCountry(data);
    setShowInfo(true);
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
  };

  return (
    <CaseContext.Provider value={context}>
      {props.children}
    </CaseContext.Provider>
  );
}

export { CaseContextProvider, CaseContext };

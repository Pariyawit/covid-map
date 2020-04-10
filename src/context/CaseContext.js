import React, { useState } from 'react';

const CaseContext = React.createContext();

function CaseContextProvider(props) {
  const [caseData, setCaseData] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [country, setCountry] = useState();

  const clickMarker = (target, id) => {
    const data = caseData.find((data) => data.id == id);
    setPosition([data.coordinates.latitude, data.coordinates.longitude]);
    setCountry(data);
  };

  const context = { caseData, setCaseData, clickMarker, position, country };

  return (
    <CaseContext.Provider value={context}>
      {props.children}
    </CaseContext.Provider>
  );
}

export { CaseContextProvider, CaseContext };

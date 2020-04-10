import React, { useState } from 'react';

const CaseContext = React.createContext();

function CaseContextProvider(props) {
  const [caseData, setCaseData] = useState(['a']);

  const context = { caseData, setCaseData };

  return (
    <CaseContext.Provider value={context}>
      {props.children}
    </CaseContext.Provider>
  );
}

export { CaseContextProvider, CaseContext };

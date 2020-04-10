import React, { useState } from 'react';

const CaseContext = React.createContext();

function CaseContextProvider(props) {
  const [caseData, setCaseData] = useState(['a']);

  return <CaseContext.Provider>{props.children}</CaseContext.Provider>;
}

export { CaseContextProvider, CaseContext };

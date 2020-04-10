import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CaseContextProvider } from './context/CaseContext';

ReactDOM.render(
  <CaseContextProvider>
    <App />
  </CaseContextProvider>,
  document.getElementById('root')
);

import '@styles/global-styles.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import developerMessage from './developer-message';
developerMessage(); // instructions to ready front-end development

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
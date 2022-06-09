import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <MoralisProvider appId="xjuTGXWO1fFQSvjaMni77ZzUhNImAj4R9iIFD6LG" serverUrl="https://ce5pkjuha5ie.usemoralis.com:2053/server">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
);

reportWebVitals();

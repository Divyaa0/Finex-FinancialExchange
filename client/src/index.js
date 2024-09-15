import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// queryClient
import { QueryClientProvider,QueryClient } from 'react-query';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/primereact.min.css';  // PrimeReact core styles
import 'primeicons/primeicons.css';  // PrimeReact icons

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient=new QueryClient();
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
             <App />
        </PrimeReactProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

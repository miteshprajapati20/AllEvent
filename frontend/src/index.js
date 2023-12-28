import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import EventContextProvider from './context/AppContext';
import {Toaster} from 'react-hot-toast'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <EventContextProvider>
        <GoogleOAuthProvider>
          <App/>
          <Toaster  position="top-center"/>
        </GoogleOAuthProvider>
      </EventContextProvider>
    </BrowserRouter>
  </>
);


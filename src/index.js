import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { CartContextProvider } from './store/cart-context';
import {disableReactDevTools}  from '@fvilers/disable-react-devtools'
if(process.env.NODE_ENV === 'production') disableReactDevTools();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
  <CartContextProvider>

  <Router>
   <App />
  </Router>

  </CartContextProvider>
  

  </AuthContextProvider>
  
    
  </React.StrictMode>
);



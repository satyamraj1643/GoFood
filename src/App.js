import React, { useContext } from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Footer from './components/Footer.js';
import AuthContext from './store/auth-context.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup.js';
import Navbar from './components/Navbar.js';
import OrderPlaced from './pages/OrderPlaced.js';
import PreviousOrders from './pages/PreviousOrders.js';
import NoMatch from './pages/NoMatch.js';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 100px)', overflow: 'hidden' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/order' element={<OrderPlaced />} />
          {authCtx.isLoggedIn && <Route path='/myorders' element={<PreviousOrders />} />}
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

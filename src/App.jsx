import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Mycomponents/Signup'
import Login from './Mycomponents/Login'
import Home from './Mycomponents/Home';
import Booking from './Mycomponents/Booking';
import Account from './Mycomponents/Account';
import AboutUs from './Mycomponents/AboutUs';
import Reviews from './Mycomponents/Reviews';
import AdminData from './Mycomponents/AdminData';
import AdminLogin from './Mycomponents/AdminLogin';
import AdminSignup from './Mycomponents/AdminSignup';
import Addbus from './Mycomponents/Addbus';
import AvailableBus from './Mycomponents/AvailableBus';

function App() {
    return (
      <Router>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/booking' element={<Booking />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/about' element={<AboutUs />}></Route>
        <Route path='/review' element={<Reviews />}></Route>
        <Route path='/admindata' element={<AdminData />}></Route>
        <Route path='/adminsignup' element={<AdminSignup />}></Route>
        <Route path='/adminlogin' element={<AdminLogin />}></Route>
        <Route path='/addbus' element={<Addbus />}></Route>
        <Route path='/availablebus' element={<AvailableBus />}></Route>
      </Routes>
      </Router>
  )
}

export default App

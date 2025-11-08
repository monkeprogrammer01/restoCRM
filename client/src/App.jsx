import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { motion } from "framer-motion"
import Home from './pages/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
export default function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contacts" element={<Contacts />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

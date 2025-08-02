import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header.jsx'
import axios from "axios"
import CarouselComponent from './components/CarousalCompent.jsx';
import { BrowserRouter } from "react-router-dom";
import Banner2 from './components/Banner2.jsx';
import CarCards from './components/CarCards.jsx';
import Footer from './components/Footer.jsx';


function App() {


  const title = 'TMT Rentals';
  const subtitle = `Your Island's Ultimate Stop for Car Rentals, Stays and More!`;


  return (
    <>
      <div>
      <CarouselComponent></CarouselComponent>
      <Banner2></Banner2>
      <CarCards></CarCards>
      </div>
    </>
  )
}

export default App

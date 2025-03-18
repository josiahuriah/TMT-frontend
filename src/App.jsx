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
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    setArray(response.data.users);
  }

  const title = 'TMT Rentals';
  const subtitle = `Your Island's Ultimate Stop for Car Rentals, Stays and More!`;

useEffect(() => {
  fetchAPI();
  }, [])

  return (
    <>
      <div>
      <CarouselComponent></CarouselComponent>
      <Banner2></Banner2>
      <CarCards></CarCards>
      <Footer />
      </div>
    </>
  )
}

export default App

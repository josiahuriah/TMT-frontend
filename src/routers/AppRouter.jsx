// src/routers/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer.jsx';
import NotFoundPage from '../components/NotFoundPage';
import App from '../App.jsx';
import RentalPage from '../components/RentalPage';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact.jsx';
import AdminPage from '../components/AdminPage.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <div id='body'>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/rental' element={<RentalPage />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </div>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
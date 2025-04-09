import React from 'react';
import {BrowserRouter, Route, Routes, Link, NavLink} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer.jsx';
import RentalPage from '../components/RentalPage';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact.jsx';
import NotFoundPage from '../components/NotFoundPage';
import AdminPage from '../components/AdminPage.jsx';
import { Checkout } from '../components/Checkout.jsx';
import App from '../App.jsx'



const AppRouter = () => (
    <BrowserRouter>
            <Header />
    <div id='body'>
        <Routes>
            <Route path='/' element={<App/>}></Route>
            <Route path='/rental' element={<RentalPage/>}></Route>
            <Route path='/about-us' element={<AboutUs/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/contact' element={<Checkout/>}></Route>
            <Route path='/admin/*' element={<AdminPage />} />
            <Route path='/*' element={<NotFoundPage/>}></Route>
        </Routes>
    </div>
            <Footer />
    </BrowserRouter>
);

export default AppRouter
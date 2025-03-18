import React from 'react';
import {BrowserRouter, Route, Routes, Link, NavLink} from 'react-router-dom';
import Header from '../components/Header';
import RentalPage from '../components/RentalPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import NotFoundPage from '../components/NotFoundPage';
import { Checkout } from '../components/Checkout.jsx';
import App from '../App.jsx'



const AppRouter = () => (
    <BrowserRouter>
            <Header />
    <div id='body'>
        <Routes>
            <Route path='/' element={<App/>}></Route>
            <Route path='/rental' element={<RentalPage/>}></Route>
            <Route path='/about' element={<AboutPage/>}></Route>
            <Route path='/contact' element={<ContactPage/>}></Route>
            <Route path='/contact' element={<Checkout/>}></Route>
            <Route path='/*' element={<NotFoundPage/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
);

export default AppRouter
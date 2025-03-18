import React from 'react';
import { Button } from "./ui/button.jsx";


const Banner2 = () => (
    <div className='banner2'>
        <div className='banner2-card'>
            <img src='/assets/logo2.png' className='m-logo'></img>
            <p className='banner2-card-text'>At TMT’s Coconut Cruisers, our mission is to provide hassle-free and exceptional car rental experiences to our customers. We are dedicated to offering a diverse selection of quality vehicles, combined with unparalleled customer service, ensuring seamless journeys and unforgettable adventures for all</p>
            <Button variant="outline" className='button'>Book Now</Button>
        </div>
        <div className='banner2-pic'>
            <img className='banner2-img' src='/assets/banner2-img.png'></img>
        </div>
    </div>
);

export default Banner2
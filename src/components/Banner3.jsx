import React from 'react';
import { Button } from "./ui/button.jsx";


const Banner3 = () => (
    <div className='banner3'>
        <div className='overlay-b3'></div>
        <img src='/assets/carousel3.jpeg' className='banner3-img'></img>
            <img src='/assets/logo2.png' className='m-logo banner3-logo'></img>
            <Button className="banner3-but">Read Car Rental FAQs</Button>
    </div>
);

export default Banner3
import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import TMTLogo from '/assets/logo3.png';
import { Button } from "@/components/ui/button"


const Footer = () => (
    <footer className='footer'>
        <div className='footer1'>
            <Link><img src={TMTLogo} alt='Logo' className='logo'></img></Link>
            <p>We pride ourselves on providing top-notch service and unbeatable value. Our friendly team is here to ensure your rental experience is seamless from start to finish</p>
        </div>
        <div className='footer2'>
            <div className='footer3'>
                <h1>Quick Links</h1>
                <NavLink to="/" className={'header-item'} >Home</NavLink><br/>
                <NavLink to="/rental" className={'header-item'} >Car Rentals</NavLink><br/>
                <NavLink to="/about" className={'header-item'} >About Us</NavLink><br/>
                <NavLink to="/contact" className={'header-item'} >Contact</NavLink><br/>
            </div>
            <div className='footer4'>
                <h1>Get In Touch</h1>
                <p>info@tmtsbahamas.com</p>
                <p>+1 (242) 472-0016 or +1 (242) 367-0942</p>
            </div>
        </div>
    </footer>
);

export default Footer
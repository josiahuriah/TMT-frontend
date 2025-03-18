// const Header = (props) => {
//     return (
//         <div>
//             <h1>{props.title}</h1>
//             {props.subtitle && <h2>{props.subtitle}</h2>}
//         </div>
//     )
// }

import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import TMTLogo from '/assets/logo3.png';
import { Button } from "@/components/ui/button"


const Header = () => (
    <header className='header'>
         <Link><img src={TMTLogo} alt='Logo' className='logo'></img></Link>
         <div className='header-menu'>
            <NavLink to="/" className={'header-item'} >Home</NavLink><br/>
            <NavLink to="/rental" className={'header-item'} >Car Rentals</NavLink><br/>
            <NavLink to="/about" className={'header-item'} >About Us</NavLink><br/>
            <NavLink to="/contact" className={'header-item'} >Contact</NavLink><br/>
        </div>
         <Button className='cta-button'>Book</Button>
    </header>
);

export default Header
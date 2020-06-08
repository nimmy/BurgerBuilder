import React from 'react';
import LogoImg from './../../assets/images/logo.png';
import "./Logo.css";

const Logo = (props) => {
    return (
        <div className="Logo">
            <img src={LogoImg} alt="App Logo" />
        </div>
    )
}

export default Logo;
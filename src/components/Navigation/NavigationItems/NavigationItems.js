import React from 'react';
import NavigationItem from './NavigaitonItem/NavigationItem';
import "./NavigationItems.css"


const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/"> Burder Builder</NavigationItem>
            <NavigationItem link="/"> Checkout</NavigationItem>
        </ul>
    )
}

export default NavigationItems;
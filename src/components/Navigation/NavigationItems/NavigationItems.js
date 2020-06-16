import React from 'react';
import NavigationItem from './NavigaitonItem/NavigationItem';
import "./NavigationItems.css"


const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact> Burder Builder</NavigationItem>
            <NavigationItem link="/orders"> Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems;
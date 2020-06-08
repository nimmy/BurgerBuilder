import React from 'react';
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux";
import BackDrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.css"


const SideDrawer = (props) => {
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={`SideDrawer ${props.open ? 'Open' : 'Close'}`}>
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;
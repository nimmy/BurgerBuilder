import React from 'react';
import Burger from '../../../Burger/Burger';
import Buttons from '../../../UI/Button/Button';
import "./CheckoutSummery.css";

const CheckoutSumery = (props) => {
    return(
        <div className="CheckoutSummery">
            <h1>We hope it taste well!!!</h1>
            <div style={{width:'300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Buttons btnType="Danger" clicked={props.checkoutCanceled}>CANCEL</Buttons>
            <Buttons btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Buttons>
        </div>
    )
}

export default CheckoutSumery;
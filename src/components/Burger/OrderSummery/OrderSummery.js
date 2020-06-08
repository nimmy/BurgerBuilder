import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummery = (props) => {
    const ingredientsSummery = Object.keys(props.ingredients)
                                .map((igKey, index) => {
                                    return <li key={index}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                                })
    return (
        <Aux>
            <h3>Your Order Summery</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientsSummery}
            </ul>
            <h4>Total Price: {props.price.toFixed(2)}</h4>
            <p>Countinue to checkout</p>
            <Button btnType="Danger" clicked={props.canceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummery;
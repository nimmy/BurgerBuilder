import React from 'react';
import './Order.css';
const Order = (props) => {
    console.log(props);
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className="Order">
            <p> Ingredients: {ingredientOutput}</p>
            <p> Price: <strong>USD: {props.price}</strong></p>
        </div>
    )
}

export default Order;
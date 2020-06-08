import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {
    
    const controlUnit = controls.map(ctrl => {
        return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)} 
                    removed={() => props.ingredientremoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />        
    });

    return (
        <div className="BuildControls">
            <h2 className="center">Current Price: {props.price.toFixed(2)}</h2>
            {controlUnit}
            <button className="OrderButton" disabled={!props.purchasable} onClick={props.checkout}>ORDER NOW</button>
        </div>
    )
}

export default BuildControls;
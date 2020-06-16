import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axiosInstance from './../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 1.7,
    tesing: 1.456
}

export default class BurgerBuilder extends React.Component{
    state = {
        ingredients: null,
        totalPrice: 40,
        purchasable: false,
        checkout: false,
        loading: false
    }

    componentDidMount () {
        axiosInstance.get('https://burgerbuilder-369a2.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }
    updatePurchasable = (currentIngredientState) => {
        const sum = Object.keys(currentIngredientState)
                    .map(ingredient => {
                        return currentIngredientState[ingredient];
                    })
                    .reduce( (sum, el) => {
                        return sum + el;
                    }, 0);
                    this.setState({purchasable: sum > 0});
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const priceAddtion = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddtion;

        updatedIngredients[type] = updatedCount;        
        this.setState({
            totalPrice: newPrice, ingredients: updatedIngredients
        });
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0) {
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const priceAddtion = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddtion;

        updatedIngredients[type] = updatedCount;        
        this.setState({
            totalPrice: newPrice, ingredients: updatedIngredients
        });
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({checkout: true});
    }

    purchaseCalcel = () => {
        this.setState({checkout: false});
    }
    purchaseContinue = () => {
        //alert('You may continue the shopping' + this.state.ingredients);
        // console.log(this.state.ingredients);
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        console.log(queryParams);
        queryParams.push("price" + '=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: 'checkout',
            search: '?' +  queryString
        });
    }

    updateBackEndState =() => {
        const stateObject= {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
        axiosInstance.post('ingredients.json', stateObject)
            .then(response => {
                console.log(response);
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let OrderSummeryDetails = null;
        
        if (this.state.loading) {
            OrderSummeryDetails = <Spinner />
        }

        let burgerBodyComponent =  <Spinner />;
        if (this.state.ingredients) {
            burgerBodyComponent = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientremoved={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    checkout={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
            )
            OrderSummeryDetails = <OrderSummery 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            canceled={this.purchaseCalcel}
                            continue={this.purchaseContinue} />;
        }
        return(
            <Aux>
                <Modal show={this.state.checkout} modelClosed={this.purchaseCalcel}>
                    { OrderSummeryDetails }
                </Modal>
                <button onClick={this.updateBackEndState}>UpdateState</button>
                { burgerBodyComponent }
            </Aux>
        )
    }
}
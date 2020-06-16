import React from 'react';
import CheckoutSumery from '../../components/Burger/Order/CheckoutSummery/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component{
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: 0
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredients, totalPrice: price});
    }
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSumery 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + "/contact-data"} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props} />)} />
            </div>
            
        )
    }
}

export default Checkout;
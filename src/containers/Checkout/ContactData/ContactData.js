import React from 'react';
import Button from '../../../components/UI/Button/Button';
import axiosInstance from './../../../axios-orders';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends React.Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postelCode: "",
            phone: ""
        },
        loading: false
    }

    orderCheckoutHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        const orderObject = {
            ingredients : this.props.ingredients,
            totalPrice: this.props.price,
            customerDetails: {
                name: "Nimesh Mehra",
                address: {
                    street: "Gali no 4, Vikas Nagar",
                    city: "Rewari",
                    state: "Haryana",
                    postpin: "123401"
                },
                emailId: "nimesh.mehra@gmail.com",
                contactNo: "9910228868",
                deliveryMethod: "fastest"
            }
        }
        {this.setState({loading: true})};
        axiosInstance.post('orders.json', orderObject)
            .then(response =>{
                {this.setState({loading: false})};
                this.props.history.push('/');
                console.log(response);
            })
            .catch(error => {
                {this.setState({loading: false})};
                console.log(error);
            })
    }

    render() {
        let form = (<form>
                <input type="text" placeholder="Your Name" />
                <input type="Email" placeholder="Your Mail" />
                <input type="text" placeholder="Street" />
                <input type="text" placeholder="Postal Code" />
                <input type="text" placeholder="Your Phone" />
                <Button btnType="Success" clicked={this.orderCheckoutHandler}>Order Checkout</Button>
            </form>)
        if ( this.state.loading ) {
            form = <Spinner />
        } 
        return (
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                { form }                
            </div>
        )
    }
}

export default ContactData;
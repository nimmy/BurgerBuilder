import React from 'react';
import Order from '../../components/Burger/Order/Order';
import axiosInstance from '../../axios-orders';

class Orders extends React.Component{
    state = {
        loading: true,
        orders: [],
        initailBlankOrder: true
    }

    componentDidMount () {
        axiosInstance.get('orders.json')
            .then(response => {
                if (response.data !== null) {
                    console.log(response);
                    const fatchOrders = [];
                    for (let key in response.data) {
                        fatchOrders.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    this.setState({initailBlankOrder: false, loading: false, orders: fatchOrders});
                } else {

                }
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            })
    }
    render() {
        return (
             <div>
                 {this.state.initailBlankOrder && <h4 style={{textAlign: 'center'}}>Make an order </h4>}                 
                 {this.state.orders.map(order => {
                     return (
                        <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.totalPrice} />
                     )
                 })}
             </div>
        );
    }
}

export default Orders;
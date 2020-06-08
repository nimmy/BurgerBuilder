import React from 'react';
import  Aux from '../../hoc/Aux' ;
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer : false
    }

    SideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer : !this.state.showSideDrawer
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar closed={this.SideDrawerCloseHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler} />
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;


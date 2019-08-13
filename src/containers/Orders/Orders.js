import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

import Order from './Order/Order.js'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary.js';
import axiosInstance from '../../axios.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state={
        loadedData: false,
        orders: null
    }
    componentDidMount(){
        this.props.getAllOrders(this.props.token, this.props.userId)
    }
    render(){
        if(!this.props.token) this.props.history.push('/')

        let content = <Spinner/> 
        let title = 'Fetching orders...'


        if(this.props.fetched){
            this.props.orders.length === 0
            ? content = <p style={{textAlign:"center"}}>No orders found</p>
            : content = this.props.orders.map((order, index)=>{
                return  <Order
                clicked={this.props.deleteOrder}
                id={order['id']}
                key={index} 
                customerDetails={order['customerDetails']} 
                orderDetails={order['OrderDetails']}/>
            })
            title = 'All orders'
        }
        return(
            
            <Auxiliary>
                <h1 style={{textAlign:"center"}}>{title}</h1>
               {content}
            </Auxiliary>
        )
    }
}
const mapStateToProps = state => {
    return{
        order: state.order.orderDetails,
        orders: state.order.orders,
        fetched: state.order.fetched,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        getAllOrders : (token, userId) => dispatch(actions.getAllOrders(token, userId)),
        deleteOrder : orderId => dispatch(actions.deleteOrder(orderId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps )( withErrorHandler(Orders, axiosInstance))
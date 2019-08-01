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
        this.props.getAllOrders()
    }
    render(){
        let content = <Spinner/> 
        let title = 'Fetching orders...'
        if(this.props.orders.length !== 0){
            content = this.props.orders.map((order, index)=>{
                return <Order key={index} customerDetails={order['customerDetails']} orderDetails={order['OrderDetails']}/>
            })
            title = 'All orders'
        
        }
        console.log(this.props.orders)
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
        orders: state.order.orders
    }
}
const mapDispatchToProps = dispatch => {
    return{
        getAllOrders : () => dispatch(actions.getAllOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps )( withErrorHandler(Orders, axiosInstance))
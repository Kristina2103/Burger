import * as actionTypes from './actionTypes'
import axiosInstance from '../../axios'

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const sendOrderSuccess = (id, orderDetails) => {
    return{
        type: actionTypes.SEND_ORDER_SUCCESS,
        orderId: id,
        orderDetails: orderDetails
    }
}
export const sendOrderFailed = (err) => {
    return{
        type: actionTypes.SEND_ORDER_FAILED,
        error: err
    }
}
export const sendOrderWaiting = () => {
    return{
        type: actionTypes.SEND_ORDER_WAITING,
    }
}

export const getOrdersSuccess = orders => {
    return{
        type: actionTypes.GET_ORDERS_SUCCESS,
        payload: orders
    }
}

export const getOrdersFailed = () => {
    return{
        type: actionTypes.GET_ORDERS_FAILED
    }
}

export const getAllOrders = () => {
    return dispatch => {
        axiosInstance.get('/orders.json')
            .then( res => 
                dispatch(getOrdersSuccess(res.data)
                // console.log(res.data)
                ))
            .catch( err => console.log(err.message)
                // dispatch(getOrdersFailed())
                 )
    }
}

export const sendOrder = (orderDetials) => {
    
    return dispatch => {
        dispatch(sendOrderWaiting())
        axiosInstance.post('/orders.json', (orderDetials))
            .then( res => dispatch(sendOrderSuccess(res.data['name'], orderDetials)))
            .catch((err) => dispatch(sendOrderFailed(err)))
    }
}


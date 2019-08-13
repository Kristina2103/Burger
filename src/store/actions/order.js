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
const deleteOrderSuccess = orderId => {
    return{
            type: actionTypes.DELETE_ORDER,
            orderId: orderId
        }
}
export const deleteOrder = orderId => {
    return dispatch => {
        axiosInstance.delete('/orders/'+orderId+'.json', )
        .then((res) => dispatch(deleteOrderSuccess(orderId)))
    }
}

export const getOrdersFailed = () => {
    return{
        type: actionTypes.GET_ORDERS_FAILED
    }
}

export const getAllOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="'+userId + '"'
        axiosInstance.get('/orders.json' + queryParams)
            .then( res =>  dispatch(getOrdersSuccess(res.data)))
            .catch( err =>  dispatch(getOrdersFailed()))
    }
}

export const sendOrder = (orderDetials, token) => {
    return dispatch => {
        dispatch(sendOrderWaiting())
        axiosInstance.post('/orders.json?auth='+token, (orderDetials))
            .then( res => dispatch(sendOrderSuccess(res.data['name'], orderDetials)))
            .catch((err) => dispatch(sendOrderFailed(err)))
    }
}


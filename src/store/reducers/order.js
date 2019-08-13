import * as actionTypes from '../actions/actionTypes'

const InitialState = {
    orderDetails: [],
    loading:false,
    purchased: false,
    orders: [],
    error:false,
    fetched: false
}

const send_order_success = (state, action) => {
    const newOrder = {
        ...action.orderDetails,
        id: action.orderId
    }
    return{
        ...state,
        orderDetails: state.orderDetails.concat(newOrder),
        loading:false,
        purchased: true
    }
}
const send_order_failed = (state, action) => {
    return{
        ...state,
        loading: false
    }
}
const send_order_waiting = (state, action) => {
    return{
        ...state,
        loading:true
    }
}
const purchase_init = (state, action) => {
    return{
        ...state,
        purchased: false
    }
}
const get_order_success = (state, action) => {
    let orderList = Object.keys(action.payload).map(obj => {
        return {
            id: obj,
            ...action.payload[obj]
        }
    })
    
    return{
        ...state,
        orders: state.orders.concat(orderList),
        fetched: true
    }
}
const get_order_failed = (state, action) => {
    return{
        ...state,
        error: true,
        fetched: false
        }
}
const deleteOrder = (state, action) => {
    return{
        ...state,
        orders: state.orders.filter((obj) => obj.id !== action.orderId )
    }
}
//Reducer
const order = (state = InitialState, action) => {
    switch(action.type){
        case actionTypes.SEND_ORDER_SUCCESS: return send_order_success(state, action)
        case actionTypes.SEND_ORDER_FAILED: return send_order_failed(state, action)
        case actionTypes.SEND_ORDER_WAITING: return send_order_waiting(state, action)
        case actionTypes.PURCHASE_INIT: return purchase_init(state, action)
        case actionTypes.GET_ORDERS_SUCCESS: return get_order_success(state, action)
        case actionTypes.GET_ORDERS_FAILED: return get_order_failed(state, action)
        case actionTypes.DELETE_ORDER: return deleteOrder(state, action)
        default: return state
    }
    
}
export default order
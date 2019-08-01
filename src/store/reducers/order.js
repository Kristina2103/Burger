import * as actionTypes from '../actions/actionTypes'

const InitialState = {
    orderDetails: [],
    loading:false,
    purchased: false,
    orders: [],
    error:false
}

const order = (state = InitialState, action) => {
    switch(action.type){
        case actionTypes.SEND_ORDER_SUCCESS:
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
        case actionTypes.SEND_ORDER_FAILED:
            return{
                ...state,
                loading: false
            }
        case actionTypes.SEND_ORDER_WAITING:
            return{
                ...state,
                loading:true
            }
       case actionTypes.PURCHASE_INIT:
           return{
               ...state,
               purchased: false
           }

        case actionTypes.GET_ORDERS_SUCCESS:
            let orderList = Object.keys(action.payload).map(obj => {
                return action.payload[obj]
            })
            
            return{
                ...state,
                orders: state.orders.concat(orderList)
            }
        case actionTypes.GET_ORDERS_FAILED:
            return{
                ...state,
                error: true
                }
        default:
            return state
    }
    
}
export default order
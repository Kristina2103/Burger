import * as actionTypes from '../actions/actionTypes'

const InitialState = {
    ingredients : null,
    error: false,
    purchasable : false
}

const burgerBuilder = (state=InitialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map((content, i) => i === action.payload 
                    ? {...content, qty: state.ingredients[action.payload].qty + 1 }
                    : content
                )
            }
        case actionTypes.REMOVE_INGREDIENT:{
            return {
                ...state,
                ingredients: state.ingredients.map((content, i) => i === action.payload
                    ? {...content, qty: state.ingredients[action.payload].qty - 1 }
                    : content
                )
                
            }
        }
           
        case actionTypes.UPDATE_PURCHASABLE:
            return{
                ...state,
                purchasable: action.payload
            }
        
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.payload,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        default:
             return state
    }
}

export default burgerBuilder
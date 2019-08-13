import * as actionTypes from '../actions/actionTypes'

const InitialState = {
    ingredients : null,
    error: false,
    purchasable : false,
    building: false
}

const add_ingredient = (state, action) => {
    return {
        ...state,
        ingredients: state.ingredients.map((content, i) => i === action.payload 
            ? {...content, qty: state.ingredients[action.payload].qty + 1 }
            : content
        ),
        building: true
    }
}
const remove_ingredient = (state, action) => {
    return {
        ...state,
        ingredients: state.ingredients.map((content, i) => i === action.payload
            ? {...content, qty: state.ingredients[action.payload].qty - 1 }
            : content
        ),
        building: true
        
    }
}
const fetch_ingredients_failed = (state, action) => {
    return{
        ...state,
        error: true
    }
}
const update_purchasable = (state, action) => {
    return{
        ...state,
        purchasable: action.payload
    }
}
const set_ingredients = (state, action) => {
    return{
        ...state,
        ingredients: action.payload,
        error: false,
        building: false
    }
}
//Reducer
const burgerBuilder = (state=InitialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return add_ingredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return remove_ingredient(state, action)
        case actionTypes.UPDATE_PURCHASABLE: return update_purchasable(state, action)
        case actionTypes.SET_INGREDIENTS: return set_ingredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetch_ingredients_failed(state, action)
        default: return state
    }
}

export default burgerBuilder
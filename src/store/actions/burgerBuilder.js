import * as actionTypes from './actionTypes'
import axiosInstance from '../../axios'

export const addIngredient = index => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        payload: index
    }
}
export const removeIngredient = index => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        payload: index
    }
}
export const setIngredients = ingredients => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        payload: ingredients
    }
}
export const handleIngredientsError = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
} 

export const getInitialIngredients = () => {
    return dispatch => {
        axiosInstance.get('https://react-burger-f4c7e.firebaseio.com/ingredients.json')
            .then( response =>{
                 dispatch(setIngredients(response.data))
            })
            .catch(err=> {
                dispatch(handleIngredientsError)
            })
    }
}
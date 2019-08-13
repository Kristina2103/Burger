import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'
const InitialState ={
    loading: false,
    token: null,
    userId: null,
    error: null
}

const authStart = (state) => {
    return updateObject(state, {error:null, loading: true})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        error:null, 
        loading: false,
        token: action.idToken,
        userId: action.userId
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.err,
        loading: false
    })
}

const authLogout = (state) => {
    return updateObject(state, {
            token: null,
            userId: null
        })
}

const auth = (state=InitialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAILED: return authFailed(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state)
        default: return state
    }
}
export default auth
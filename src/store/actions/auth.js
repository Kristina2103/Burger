import *  as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFailed = (err) => {
    return{
        type: actionTypes.AUTH_FAILED,
        err: err
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, expirationTime * 1000 )
    } 
}
export const auth = (email, password, isSignUp,redirectUrl, history) => {
    return dispatch => {
        dispatch(authStart())

        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3bvdhS5B9M5oUpL_4VCHMRBiVQ5m4lNY'
        if(!isSignUp) url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3bvdhS5B9M5oUpL_4VCHMRBiVQ5m4lNY'

        axios.post(url, data)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', res.data.localId)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn))
            history.push(redirectUrl)
        })
        .catch(err =>{
            dispatch(authFailed(err.response.data.error.message))
        })
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token =  localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            const userId = localStorage.getItem('userId')
            if(expirationDate >= new Date()){
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }else{
                dispatch(logout())
            }
        }
    }
}
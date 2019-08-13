import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import  classes from './Auth.css';

class Auth extends Component{
    state = {
        user:{
            email: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "E-mail"
                },
                validation : {
                    required: true,
                    isEmail: true
                },
                isValid : false,
                touched: false
            },
            password: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                validation : {
                    required: true,
                    minLength: 6
                },
                isValid : false,
                touched: false
            },
        },
        isFormValid: false ,
        isSignUp: true
    }
    checkInputValidity(value, rule){
        let isValid = true
        if(rule.required){
            isValid = value.trim() !== "" && isValid
        }
        if(rule.minLength){
            isValid = value.length >= rule.minLength && isValid
        }
        if(rule.isEmail){
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase());
        }
        return isValid
    }
    onInputChange = (e, inputName) => {
        const updatedUser = {
            ...this.state.user,
            [inputName]: {
                ...this.state.user[inputName],
                value: e.target.value,
                isValid: this.checkInputValidity(e.target.value, this.state.user[inputName].validation),
                touched: true
            }
        }
        let isFormValid = true
         for(let inputElement in updatedUser){
             isFormValid = updatedUser[inputElement].isValid && isFormValid
         }
        this.setState({
            user: updatedUser,
            isFormValid:isFormValid
        })
    }
    onButtonClick = (e) => {
        e.preventDefault()
        let redirectUrl = '/'
        if(this.props.continueBuildingBurger) redirectUrl = '/checkout'
        return this.props.onButtonClick(
            this.state.user.email.value, 
            this.state.user.password.value, 
            this.state.isSignUp,
            redirectUrl,
            this.props.history)
    }
    onSwitchForm = (e) => {
        e.preventDefault()
        this.setState( prevState => {
            return{
                isSignUp: !prevState.isSignUp
            }
        } )
    }
   
    render(){
        const userArray = []
        for (let key in this.state.user){
            userArray.push({
                id: key,
                config: this.state.user[key]
            })
        }
        let inputs =userArray.map(el => {
            let shouldValidate
            (el.config.touched && el.config.validation ) ? shouldValidate = true : shouldValidate = false
            return <Input key={el.id}
                     elementType={el.config.elementType} 
                     name={el.id}
                     valid ={el.config.isValid}
                     shouldValidate = {shouldValidate}
                     elementConfig={el.config.elementConfig} 
                     label={el.config.elementConfig.placeholder}
                     onInputChange={(e) => this.onInputChange(e, el.id)}
                    />
       })
       let errorMessage = null
       if(this.props.error) errorMessage = <p>{this.props.error}</p>

       let content =  
            <form>
                {/* {redirectUser} */}
                {errorMessage}
                {inputs}
                <Button 
                    disabled={!this.state.isFormValid}
                    clicked={this.onButtonClick}
                    typeButton="Success" >Submit</Button>
                    <Button 
                    clicked={this.onSwitchForm}
                    typeButton="Danger" > Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up' } </Button>
            </form>
        if(this.props.loading) content = <Spinner />
        return(
            <div className={classes.Auth}>
               {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        continueBuildingBurger: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onButtonClick: (email, password, isSignUp, redirectUrl, history) => dispatch(actions.auth(email, password, isSignUp, redirectUrl, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

import classes from './Contact.css'
import Button from '../../../components/UI/Button/Button'
import axiosInstance from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {checkInputValidity} from '../../../shared/utility'

class Contact extends Component{
    state = {
        customerDetails:{
            firstName: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "First Name"
                },
                validation : {
                    required: true
                },
                isValid : false,
                touched: false
            },
            lastName: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Last Name"
                },
                validation : {
                    required: true
                },
                isValid : false,
                touched: false
            },
            email: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "E-mail"
                },
                validation : {
                    required: true
                },
                isValid : false
            },
            number: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Phone"
                },
                validation : {
                    required: true,
                    minLength:9,
                    maxLength: 10
                },
                isValid : false,
                touched: false
            },
            street: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                validation : {
                    required: true
                },
                isValid : false,
                touched: false
            },
            streetNumber: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Street Number"
                },
                validation : {
                    required: true
                },
                isValid : false,
                touched: false
            },
            city: {
                value:"",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "City"
                },
                validation : {
                    required: true
                },
                isValid : false,
                touched: false
            },
            deliveryMethod: {
                value:"fastest",
                elementType: "select",
                elementConfig: {
                    placeholder: 'Delivery Method',
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                isValid:true
            },
            
        },
        isFormValid: false,
        loading:false,
    }
    

    orderHandler = (e) => {
        e.preventDefault()

        let details = {}
        for (let [key, value] of Object.entries(this.state.customerDetails)) {
            let displayName = this.state.customerDetails[key].elementConfig.placeholder
            details[displayName] = value.value 
          }
         const data = {
             OrderDetails : this.props.ingredients,
             customerDetails: details,
             userId: this.props.userId
         }
         return this.props.sendOrder(data, this.props.token )
    }
    onInputChange = (e, elementId) => { 
        const updatedCustomerDetails = {
            ...this.state.customerDetails
        }
        const formElement = {
            ...updatedCustomerDetails[elementId]
        }
        formElement.value = e.target.value
        updatedCustomerDetails[elementId] = formElement
        updatedCustomerDetails[elementId].touched = true
        updatedCustomerDetails[elementId].isValid = checkInputValidity(updatedCustomerDetails[elementId].value,updatedCustomerDetails[elementId].validation)
        
        let isFormValid = true
         for(let inputElement in updatedCustomerDetails){
             isFormValid = updatedCustomerDetails[inputElement].isValid && isFormValid
         }
        this.setState({ 
            customerDetails : updatedCustomerDetails,
            isFormValid : isFormValid
        })
    }
    
    render(){
        const customerDetailsArray = []
        for (let key in this.state.customerDetails){
            customerDetailsArray.push({
                id: key,
                config: this.state.customerDetails[key]
            })
        }
        const inputs =customerDetailsArray.map(el => {
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
       let note =  <p><strong>Please fill the form to finish your purchase</strong></p>
       if(this.props.ingredients){
        if(this.props.ingredients.length === 0){
            note = <p style={{color: 'red'}}>Please add ingredients to submit the form!</p>
           }
       }
      
        let content = (
            <form className={classes.Form}>
                {note}
                {inputs} 
                <Button typeButton="Success" disabled={!this.state.isFormValid} clicked={this.orderHandler}>Order</Button>
            </form>
        )
        if(this.props.loading){
            content = <Spinner/>
        }
        
        return(
            <div className={classes.Contact}>
                {content}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ingredients : state.burgerBuilder.ingredients,
        orderDetails : state.order.orderDetails,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        sendOrder : (orderDetails, token) => dispatch(actions.sendOrder(orderDetails, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contact, axiosInstance))
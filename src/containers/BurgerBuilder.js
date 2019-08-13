import React, {Component} from 'react'
import {connect} from 'react-redux'

import Auxiliary from '../hoc/Auxiliary/Auxiliary'
import Burger from '../components/Burger/Burger'
import BuildControls from '../components/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'
import axiosInstance from '../axios';
import Spinner from '../components/UI/Spinner/Spinner'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../store/actions/index'

class BurgerBuilder extends Component{
    state = {
        purchasable: false,
        purchasing:false,
    }
    componentDidMount(){
        this.props.onInitIngredients()
    }
   
    purchaseHandler = () => {
        if(!this.props.isAuth) return this.props.history.push('/auth')
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
    }
    updatePurchasable = ()=>{
        const ingredient = this.props.ingredients
        const sum = ingredient.reduce( (sum, ingredient)=>{
            return sum + ingredient.qty
        }, 0)
        return sum > 0
    }
    render(){
        let orderSummary 
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if(this.props.ingredients){
            burger = (
               <Auxiliary>
                <Burger />
                <BuildControls 
                    isAuth={this.props.isAuth}
                    purchase={this.purchaseHandler}
                    purchasable={this.updatePurchasable}
                    />
                </Auxiliary>
           )
            orderSummary = <OrderSummary 
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
            />
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
    
}
const mapStateToProps = state => {
   return {
    ingredients : state.burgerBuilder.ingredients,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building
   }
}
const mapDispatchToProps = dispatch => {
    return{
        onInitIngredients: () => dispatch(burgerBuilderActions.getInitialIngredients())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
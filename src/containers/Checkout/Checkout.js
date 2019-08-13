import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

import classes from './Checkout.css'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Contact from './Contact/Contact'


class Checkout extends React.Component{
 
    componentDidMount(){
        this.props.onPurchaseInit()
    }
    purchaseCancelHandler = () => {
        this.props.history.goBack()
    }

    purchaseContinueHandler = (e) => {
        this.props.history.replace('/checkout/contact') 
    }
   
   render(){
       let summary = null
    
        if(this.props.ingredients){
            summary= <div className={classes.Checkout}>
            <CheckoutSummary 
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
            />
            <Route path={this.props.match.path +"/contact"} component={Contact} />
            
        </div>
        }
        if(this.props.purchased) summary = <Redirect to="/orders"/>
    return (
        <div>
        {summary}
        </div>
    )
   }
}
const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
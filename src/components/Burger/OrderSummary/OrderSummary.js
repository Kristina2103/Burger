import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
import {connect} from 'react-redux'

const OrderSummary = (props) => {
    const orderedIngrediants = props.ingredients.filter(ingrediant => ingrediant.qty !== 0)
    const order = orderedIngrediants.map((ingrediant, index) => {
        return <li key={index}> {ingrediant.name} x {ingrediant.qty} <strong style={{float:"right"}}> {(ingrediant.qty * ingrediant.price).toFixed(2)} RSD </strong></li>
    })
    const sum = orderedIngrediants.reduce( (sum, ing)=>{return sum + ing.price * ing.qty}, 0 ).toFixed(2)
    return (
        <Auxiliary>
            <h2>Your Order</h2>
            <ul>
                {order}
            </ul>
            <hr />
            <p style={{float:"right"}}>Total: <strong>{sum} RSD</strong>  </p>
            
            <Button typeButton="Danger" clicked={props.cancelPurchase}> Cancel </Button>
            <Button typeButton="Success" clicked={props.continuePurchase}> Continue </Button>
        </Auxiliary>
    )
}
const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients
    }
}


export default connect(mapStateToProps)(OrderSummary)
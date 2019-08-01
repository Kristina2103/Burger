import React from 'react'
import {connect} from 'react-redux'

import classes from './BuildControls.css'
import BuildControl from './BuldControl/BuildControl'

const BuildControls = (props)=>{
    const ingredients = props.ingredients
        .map( (ingredient, index) => {
            return  <BuildControl 
                key={index}
                name={ingredient.name} 
                index={index}
                disabled={ingredient.qty === 0 ? true : false}>
                </BuildControl>
        } )
        
    return (
        <div className={classes.BuildControls}>
             <h1>Choose Ingredients</h1>
            {ingredients}
            <button 
            className={classes.PurchaseButton}
            onClick={props.purchase}
            disabled={!props.purchasable} 
            >Purchase!</button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
    }
}
export default connect(mapStateToProps)(BuildControls)
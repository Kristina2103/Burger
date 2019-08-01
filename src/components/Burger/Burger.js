import React from 'react'
import {connect} from 'react-redux'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import {withRouter} from 'react-router-dom'

const Burger = props => {
    let ingredients = props.ingredients.map( (ingredient, index) => {
            let items =[]
            for(let i=0;i<ingredient.qty;i++){
                items.push(  <BurgerIngredient key={index+i} type={ingredient.name}/>)
            }
            return items
    } )
    
    let sum = props.ingredients.filter(ing=> ing.qty !== 0).reduce( function(total,ing){ 
        return total + ing.price*ing.qty; 
    }, 0).toFixed(2)
    
    if(sum === "0.00") ingredients ="Please start adding ingredients"

    return(
        <div className={classes.Burger}>
            <p>Burger price:<strong> {sum} RSD </strong></p>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(withRouter(Burger))
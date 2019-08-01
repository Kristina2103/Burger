import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as burgerBuilderActions from '../../../store/actions/index'

import classes from './BuildControl.css'

class BuildControl extends Component {
    render(){   
        return(
            <div className={classes.BuildControl}>
                <div>
                    <p className={classes.Label}>{this.props.name}  </p> 
                </div>
                
                <button 
                    className={classes.RemoveIngredient} 
                    onClick={()=>{this.props.onRemoveIngredient(this.props.index)} }
                    disabled={this.props.disabled}
                    > - </button>
                <button 
                    className={classes.AddIngredient} 
                    onClick={()=>this.props.onAddIngredient(this.props.index)}
                    > + </button> 
            
        </div>
        )
    }
      
    
}
const mapStateToProps = state => {
    return {
     ingredients : state.burgerBuilder.ingredients,
    }
 }
 const mapDispatchToProps = dispatch => {
     return {
         onAddIngredient : index => dispatch(burgerBuilderActions.addIngredient(index)), 
         onRemoveIngredient: index => dispatch(burgerBuilderActions.removeIngredient(index)),
     }
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(BuildControl);
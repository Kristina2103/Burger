import React from 'react'
import classes from  './Order.css'

const Order = (props) => {
    const customerDetails =Object.keys(props.customerDetails).map(key => {
        return <li className={classes.CustomerDetails} key={key} ><span>{key}</span> : {props.customerDetails[key]} </li>
      })
      
    const ingredients = props.orderDetails.map((order, index)=>{
       return <li className={classes.Ingredient} key={index} ><span>{order.name}</span> : {order.qty} x {order.price}RSD</li>
    })
  
    const total = props.orderDetails.reduce((sum, order)=>{return sum + order.price*order.qty},0)

    return(
        <div className={classes.Order}>
            <h2>Ingredients:</h2>
            <ul>
             {ingredients}
            </ul>
            <p style={{fontWeight:"bold"}}><span style={{color:"#e27b36"}}>Total:</span> {total}RSD </p>
            <h2>Order Details:</h2>
            <ul>
           {customerDetails}
           </ul>
        </div>
    )
}
export default Order
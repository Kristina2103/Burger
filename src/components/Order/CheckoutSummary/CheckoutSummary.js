import React from 'react'
import Button from '../../UI/Button/Button'
import Burger from '../../Burger/Burger'

const CheckoutSummary = props => (
    <div>
        <div style={{textAlign:"center"}}>
            <h1>We hope it tastes well!</h1>
            <Burger />
            <Button typeButton="Danger" clicked={props.cancelPurchase}> Cancel </Button>
            <Button typeButton="Success" clicked={props.continuePurchase}> Continue </Button>
        </div>
    </div>
)

export default CheckoutSummary

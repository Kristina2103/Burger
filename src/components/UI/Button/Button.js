import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import classes from './Button.css'

const Button = props => (
    <Auxiliary>
        <button 
            className={[classes.Button, classes[props.typeButton]].join(" ")}
            onClick={props.clicked}
            disabled={props.disabled}>{props.children}</button>
    </Auxiliary>
)

export default Button
import React from 'react'
import classes from './DrawerToggler.css'

const DrawerToggler = props => (
    <div className={classes.DrawerToggler} onClick={props.open}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default DrawerToggler
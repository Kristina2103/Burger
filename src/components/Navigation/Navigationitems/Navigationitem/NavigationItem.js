import React from 'react'
import classes from './NavigationItem.css'
import {NavLink} from 'react-router-dom'

const NavigationItem = props => (
    <li className={classes.NavigationItem}>
        {/* <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a> */}
        <NavLink 
            onClick={props.clicked}
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
            {props.children}</NavLink>
    </li>
)

export default NavigationItem
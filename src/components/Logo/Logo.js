import React from 'react'
import classes from './Logo.css'
import LogoImg from '../../assets/images/LogoImage.png'
import {withRouter} from 'react-router-dom'

const Logo = props => {
    const backToHome = () =>{
        props.history.push('/')
    }
    return(<div className={classes.Logo} onClick={backToHome}>
        <img src={LogoImg} alt="Logo" />
     </div>)
}

export default withRouter(Logo)
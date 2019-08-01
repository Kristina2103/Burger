import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/NavigationItems';
import  classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrops/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const SideDrawer = props => (
    
    <Auxiliary >
        <Backdrop 
            opened={props.opened} 
            close={props.close}/>
        <div className={[classes.SideDrawer, props.opened ? classes.Open : classes.Close].join(" ")}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </div>
    </Auxiliary> 
)

export default SideDrawer
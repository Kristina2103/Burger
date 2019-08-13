import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.css'
import NavigationItems from '../Navigationitems/NavigationItems'
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler'


const Toolbar = props => (
    <header className={classes.Toolbar}>
        {/* <div onClick={props.open}>Menu</div> */}
        <DrawerToggler open={props.open} />
        <div className={[classes.Logo, classes.DesktopOnly].join(" ")}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/> 
        </nav>
    </header>
)

export default Toolbar
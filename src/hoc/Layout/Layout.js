import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        isSideDrawOpened: false,
    }
    closeSideDraw = () => {
        this.setState({
            isSideDrawOpened: false
        })
    }
    openSideDraw = () => {
        this.setState({
            isSideDrawOpened:true
        })
    }
    render(){
        return(
            <Auxiliary>
                <Toolbar open={this.openSideDraw}/>
                <SideDrawer 
                    opened={this.state.isSideDrawOpened} 
                    close={this.closeSideDraw}/>
                <main className={classes.Content}> {this.props.children} </main>
            </Auxiliary>
        )
    }
}

export default Layout;
import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

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
                <Toolbar open={this.openSideDraw} isAuth={this.props.isAuth}/>
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    opened={this.state.isSideDrawOpened} 
                    close={this.closeSideDraw}/>
                <main className={classes.Content}> {this.props.children} </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return{
      isAuth: state.auth.token !== null
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
      authLogout: () => dispatch(actions.logout())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
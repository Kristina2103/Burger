import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import { Route, Switch, withRouter} from 'react-router-dom'

import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignIn()
  }

  render(){
    return (
      
        <div className="App">
          <Layout>
          <Switch>
          <Route path="/auth" exac component={Auth} />
              <Route path="/checkout"exac component={Checkout} />
              <Route path="/orders"exac component={Orders} />
              <Route path="/logout" exac component={Logout} />
              <Route path="/" exac component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

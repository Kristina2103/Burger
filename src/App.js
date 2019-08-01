import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/orders"exac component={Orders} />
              <Route path="/checkout"exac component={Checkout} />
              <Route path="/" exac component={BurgerBuilder} />
            </Switch>
          </Layout>
          
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import AddProduct from './components/AddProduct';

import Home from './components/Home';
import Login from './components/Login';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import Signup from './components/Signup';
import YourProduct from './components/YourProduct';
import EditProfile from './components/EditProfile';
import Forgotpassword from './components/Forgotpassword';
import BoughtProducts from './components/BoughtProducts';
import SoldProducts from './components/SoldProducts';
export default class App extends Component {
  render() {
    return (
      <Router>
        

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/marketplace">
            <Marketplace />
          </Route>
          <Route path="/yourproduct">
            <YourProduct />
          </Route>
          <Route path="/createproduct">
            <AddProduct/>
          </Route>
          <Route path="/addproduct">
          <AddProduct/>
          </Route>
          <Route path="/profile">
          <Profile/>
          </Route>
          <Route path="/editprofile">
          <EditProfile/>
          </Route>
          <Route path="/forget">
          <Forgotpassword/>
          </Route>
          <Route path="/cart">
          <BoughtProducts/>
          </Route>
          <Route path="/sold">
          <SoldProducts/>
          </Route>
          
        </Switch>

      </Router>
      

    )
  }
}

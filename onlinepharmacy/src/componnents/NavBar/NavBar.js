import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";
import HomePage from "../HomePage/HomePage";
import Orders from "../Orders/Orders";
import Cart from '../Checkout/Cart'
import Medicine from '../Medicine/Medicine'
import { connect } from "react-redux";

const NavBar = (props) => {

  return (
    <div>
      <Switch>
        
        <Route path ='/login' component={Login} />
        <Route path="/HomePage" component={HomePage} />
        <Route path="/Medicine" component={Medicine} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        <Route path="/" render={() => <Redirect to="/Login" />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.auth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(NavBar);

/*

    <Route path ='/login' component={Login} />
        {props.data.isValidUser ? (
          <Route path="/HomePage" component={HomePage} />
        ):<Redirect to="/login" /> }
        {props.data.isValidUser ? (
          <Route path="/orders" component={Orders} />
        ):<Redirect to="/login" /> }
        {props.data.isValidUser ? (
          <Route path="/checkout" component={Checkout} />
        ) : <Redirect to="/login" />}
        <Route path="/" render={() => <Redirect to="/Login" />} />
      </Switch>


*/
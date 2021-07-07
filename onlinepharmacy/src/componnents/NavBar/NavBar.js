import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/Login";
import HomePage from "../HomePage/HomePage";

const NavBar = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/checkout" component={Checkout} />
        <Route
          path="/HomePage"
          render={(routerProps) => (
            <HomePage {...routerProps} sampleProp={"sample"} />
          )}
        />
        <Route path="/checkout" component={Login} />
        <Route path="/default" render={() => <Redirect to="/" />} />
        <Route component={Login} />
      </Switch>
    </div>
  );
};
export default NavBar;

// <Route path="/product" render={routerProps => <Product {...routerProps} sampleProp={"sample"}/>} />

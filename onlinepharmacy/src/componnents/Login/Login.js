import React, { useState } from "react";
import styles from "./Login.module.css";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";

const Login = (props) => {
  const [authDetails, setauthDetails] = useState({
    email: "",
    password: "",
  });
  
  const onSignIn = () => {
    props.onAuth("11", "1223");
  };

  const onLogIn = () => {
    props.onAuth("11", "1223");
  };

  const loginform = (
    <div className={styles.login}>
      <Paper elevation={3}>
        <form>
          <div>
            <Typography variant="h6" gutterBottom>
              Welcome to Online Portal{" "}
            </Typography>
          </div>
          <div className="">
            <TextField
              id="email"
              label="User Name"
              variant="outlined"
              required
              value={authDetails.email}
            />
          </div>
          <div className="">
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={authDetails.password}
              required
            />
          </div>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onLogIn()}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onSignIn()}
            >
              Sign In
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
  return (
    <div>
      {loginform} 
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: JSON.stringify(state),
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Login);

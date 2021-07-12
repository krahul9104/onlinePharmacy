import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import * as apiDefaults from "../../apiDefaultValues";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CopyRight from './CopyRight';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    elevation: 3,
    minHeight: "600px",
    minWidth: "600px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  centerDiv: {
    margin: "auto",
    width: "15%",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [authDetails, setauthDetails] = useState({
    email: "pharmacy_app_integrator",
    password:
      "$s$nMqG7imljG+VFAtsD4Hthhiui4bpr3JkrzaPncPFbTI=$lZtIP54kDQS/YtYYF9g89i72DrArtyO4RPZf8S5piUQ=",
  });

  /*const onSignIn = () => {
    props.onAuth(authDetails.email, authDetails.password);
  };*/

  const onLogIn = () => {
    props.onAuth(authDetails.email, authDetails.password);
  };

  const displayLogin = props.data.loading ? (
    <div style={{marginTop:'10px'}}><CircularProgress /></div>
  ) : (
    <div className={classes.form}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={authDetails.email}
        onChange={(e, v) =>
          setauthDetails({
            ...authDetails,
            email: v,
          })
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={authDetails.password}
        onChange={(e, v) =>
          setauthDetails({
            ...authDetails,
            password: v,
          })
        }
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => onLogIn()}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </div>
  );

  const loginform = (
    <div>
      <Container component="main">
        <Paper className={classes.paper}>
          <CssBaseline />
          <div>
            <div style={{ marginTop: "10px" }}>
              <Typography component="h1" variant="h6">
                <b> {apiDefaults.APPLICATION_NAME}</b>
              </Typography>
            </div>
            <div>
              <div className={classes.centerDiv}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </div>
            </div>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {displayLogin}
            <div style={{padding:'5px',color:'red'}}>
              {!props.data.isValidUser ? props.data.error :'' }
            </div>
            {props.data.isValidUser ? <Redirect to="/Homepage" /> : ""}
          </div>

          <Box mt={8}>
            <CopyRight />
          </Box>
        </Paper>
       
      </Container>
      <div></div>
    </div>
  );
  return <div>{loginform}</div>;
};

const mapStateToProps = (state) => {
  return {
    data: state.auth,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Login);

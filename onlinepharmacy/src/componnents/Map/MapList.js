import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green, grey } from "@material-ui/core/colors";
import StoreIcon from "@material-ui/icons/Store";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../store/actions/search";

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    textAlign: "left",
    backgroundColor: "#ede7f6",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: grey[300],
    width: "70%",
    height: "70%",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));


const MapList = (props) => {
  const classes = UseStyles();
  const history = useHistory();

  const onBtnClick =(e,v)=>{
    history.push('/Checkout');
  };


  const mouseOver = (e) => {

     var key=e.target.store_id; 
     console.log(key);
     console.log(e.target);
     props.onHover(key);
  };
   


  const mouseOut = () => {
     props.onHover('');
  };

  return (
    <div className={classes.root}  key ={props.store_id} >
      <Paper className={classes.paper}>
                    <div>
              {props.store_id}</div>
      <div >
        <Grid container spacing={2}  >
          <Grid item>
            <ButtonBase
              className={classes.image}
              style={{ border: "1px solid #e8e8e8" }}
            >
              <Avatar
                variant="square"
                className={classes.square}
                style={{color:(1== 2) ?deepOrange[500]:green[500] }}
              >
                <StoreIcon></StoreIcon>
              </Avatar>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  <b> {props.store_name}</b>
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  
                </Typography>
                <Typography variant="body2" gutterBottom>
                <b>Store Average Disctance from your Location : </b>
                  {props["Distance of Store"]}
                  <div>
                    {" "}
                    <b>Address</b> :{" "}
                    {props["Store Address"] +
                      " " +
                      props["Store City"] +
                      " " +
                      500081}
                  </div>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <div>Contact Number : 9112345678</div>
                  <div>Email Address : store@gmail.com</div>
                  <div>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >
                      Store Directions
                    </Link>
                  </div>
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={(e, v) => onBtnClick(e, v)} store_id={props.store_id} onMouseOver={(e) => mouseOver(e)} onMouseOut={(e) => mouseOut(e)} >Order</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Total Price : Rs.{props.price}</Typography>
              <Typography variant="subtitle1">Discount : Rs.{props.discount}</Typography>
            </Grid>
          </Grid>
        </Grid>
        </div>
      </Paper>
    </div>
  );
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onHover: (key) => dispatch(actions.setKeyOnHover(key))
  };
};

export default connect(null, mapDispatchtoProps)(MapList);

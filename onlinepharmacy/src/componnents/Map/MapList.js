import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid,Tooltip }from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import StoreIcon from "@material-ui/icons/Store";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actionSearch from "../../store/actions/search";
import * as actionCart from "../../store/actions/cart";

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
    "&:hover": {
      backgroundColor: "#ffd180",
    },
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
    backgroundColor: "#ffe0b2",
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

  const onBtnClick = (e, props) => {
    var orderObj = props;
    props.onClickOrder(orderObj);
    history.push("/Cart");
  };

  const mouseOver = (e, store_id) => {
    props.onHover(store_id);
  };

  const mouseOut = () => {
    props.onHover("");
  };

  const tooltipText = "All medecines are not available in this store";
  const orderBtn = (
    <Button
      variant="contained"
      onClick={(e) => onBtnClick(e, props)}
      store_id={props.store_id}
    >
      Order
    </Button>
  );

  const orderButtonwithToolTipCond =
    props.medicineSearchCount !== props["No of Search Medicine Available"] ? (
      <Tooltip title={tooltipText}>{orderBtn}</Tooltip>
    ) : (
     <div> { orderBtn }</div>
    );
  const inputStyleList =
    props.index === 0 ? { border: "5px solid #ffab00" } : { border: "none" };
  return (
    <div className={classes.root} key={props.store_id}>
      <Paper className={classes.paper} style={inputStyleList}>
        {props.index === 0 ? (
          <div>
            <b>Best Result</b>{" "}
          </div>
        ) : (
          ""
        )}
        <div
          onMouseOver={(e) => mouseOver(e, props.store_id)}
          onMouseOut={(e) => mouseOut(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ButtonBase className={classes.image}>
                <Avatar
                  variant="square"
                  className={classes.square}
                  style={{
                    color:
                      props.storeType === "Online"
                        ? deepOrange[500]
                        : green[500],
                  }}
                >
                  <StoreIcon></StoreIcon>
                </Avatar>
              </ButtonBase>
            </Grid>
            <Grid item xs={8}>
              <Grid item container>
                <Grid item sm={6}>
                  <Typography gutterBottom variant="subtitle1">
                    <b> {props.store_name}</b>
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant="subtitle1">
                    Total Price : Rs.{props.price}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Typography variant="body2" color="body2" gutterBottom>
                  <div>
                    <b>
                      Esitmate Delivery Time : {props["deliveryTime"]} Hours
                    </b>
                  </div>
                  <div>
                    {props.storeType === "Offline" ? (
                      <b>Store Disctance : {props["Distance of Store"]} Km</b>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    Medicine Available :{" "}
                    {props["No of Search Medicine Available"]}
                  </div>
                  <div>Contact Number : {props.storeContactNumber}</div>
                  <div>Email Address : {props.storeEmailAddress}</div>
                  <div>
                    Address :{" "}
                    {props["Store Address"] + " " + props["Store City"] + " "}
                  </div>
                  <div>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >
                      {props.storeType === "Offline"
                        ? "Store Directions"
                        : "Click here to visit store website"}
                    </Link>
                  </div>
                </Typography>
              </Grid>
              <div>{orderButtonwithToolTipCond}</div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    medicineSearchCount: state.search.medicineIdArr.length,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onHover: (store_id) => dispatch(actionSearch.setKeyOnHover(store_id)),
    onClickOrder: (orderObj) => dispatch(actionCart.onOrder(orderObj)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(MapList);

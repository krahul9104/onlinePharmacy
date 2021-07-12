import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { deepOrange, deepPurple, green, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Avatar,IconButton} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cart";

const UseStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  mainDiv: {
    width: "100%",
    border: "1px solid #e8e8e8",
    marginTop: "10px",
  },
  paper: {
    minHeight: "500px",
    padding: "10px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Cart = () => {
  const classes = UseStyles();
  const [open, setOpen] = React.useState(true);
  const orderObj = {
    shopdetails: {
      CompanyName: "Apollo Pharmacy",
      "Store Address": "JNTU",
      "Store City": "Hyderabad",
      "Distance of Store": "2.68  Km",
    },
    medicines: [
      {
        medicineId: "6e0570e31bcdb010060965b3b24bcb04",
        medicineDescription:
          " It is used to treat type 2 diabetes mellitus in adults, when it cannot be controlled by diet or exercise.",
        "mediicneComposition ": "vildagliptin",
        price: 75,
        discount: 10,
        selectedUnit:1,
        AvilableUnits: 234,
      },
      {
        medicineId: "25c7b8271bcdb010060965b3b24bcb1c",
        medicineDescription:
          "reduces the amount of acid produced in your stomach",
        "mediicneComposition ": "pantoprazole",
        price: 95,
        discount: 10,
        selectedUnit:1,
        AvilableUnits: 20,
      },
      {
        medicineId: "25c7b8271bcdb010060965b3b24bcb1c",
        medicineDescription:
          "reduces the amount of acid produced in your stomach",
        "mediicneComposition ": "pantoprazole",
        CompanyName: "Apollo Pharmacy",
        price: 95,
        discount: 10,
        selectedUnit:1,
        AvilableUnits: 20,
      },
    ],
    "Total Price": 100,
    discount: 0,
    promocode: "",
  };

  const handleClick = () => {
    setOpen(!open);
  };
 

  const onAddIconClick =() =>{
     
  }

  const onRemoveIconClick =() =>{
      
}

  const medicineList = (<List>
 {orderObj.medicines.map((med, index) => (
    <ListItem>
      <div
        style={{
          width: "100%",
          border: "1px solid red",
          padding: "10px",
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item spacing={1} lg={1} sm={1}>
            <Avatar className={classes.orange}>Tab</Avatar>
          </Grid>
          <Grid item spacing={1} lg={3} sm={3}>
            Med Desc
          </Grid>
          <Grid item spacing={1} lg={3} sm={3}>
            <Grid container spacing={1} alignItems="center">
              <Grid item spacing={1} lg={2} sm={2}>
                <IconButton aria-label="Remove">
                  <RemoveCircleRoundedIcon onClick={(e, v) => onRemoveIconClick(e, v)}
                    style={{ color: green[500] }}
                  />
                </IconButton>
              </Grid>
              <Grid item spacing={1} lg={2} sm={2}>
                {med.selectedUnit}
              </Grid>
              <Grid item spacing={1} lg={2} sm={2}>
                <IconButton aria-label="Add" onClick={(e, v) => onAddIconClick(e, v)}>
                  <AddCircleOutlineIcon
                    style={{ color: red[500] }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <div >{med.AvilableUnits} Available Units</div>
          </Grid>
          <Grid item spacing={1} lg={2} sm={1}>
            {med.price} per Unit
          </Grid>
          <Grid item spacing={1} lg={2} sm={1}>
          {med.discount}% Discount
          </Grid>
          <Grid item spacing={1} lg={1} sm={1}>
          {med.price} total
          </Grid>
        </Grid>
      </div>
    </ListItem>))}
  </List>);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item container spacing={1} lg={1} sm={12}></Grid>
        <Grid item container spacing={1} lg={10} sm={12}>
          <div className={classes.mainDiv}>
            <Paper className={classes.paper} elevation={1}>
              <div style={{ padding: "10px" }}>
                <Typography variant="headline" component="h3">
                  Cart Items
                </Typography>
              </div>

              <div>
                <Grid
                  container
                  spacing={1}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item container spacing={1} lg={6} sm={6}>
                    <div style={{ align: "right" }}>
                      <div>{orderObj.shopdetails["CompanyName"]}</div>
                      <div>
                        {orderObj.shopdetails["Store Address"] +
                          " ," +
                          orderObj.shopdetails["Store City"]}
                      </div>
                    </div>
                  </Grid>
                  <Grid item container spacing={1} lg={6} sm={6}>
                    Total Amount : {orderObj["Total Price"]}
                  </Grid>
                </Grid>
              </div>
              <div>
                {medicineList}
              </div>
            </Paper>
          </div>
        </Grid>
        <Grid item container spacing={1} lg={1} sm={2}></Grid>
      </Grid>
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
    addQtyForMedicine: (medicineId) => dispatch(actions.addQty(medicineId)),
    minusQtyForMedicine: (medicineId) => dispatch(actions.minusQty(medicineId)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cart);

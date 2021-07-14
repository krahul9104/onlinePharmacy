import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { deepOrange, deepPurple, green, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { Avatar, IconButton, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cart";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";

const UseStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#e1f5fe",
    minHeight: "1200px;",
  },
  mainDiv: {
    width: "100%",
    marginTop: "10px",
  },
  paper: {
    minHeight: "500px",
    padding: "10px",
    marginTop: "10px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  medicineTblDiv: {
    padding: "20px",
    textAlign: "left",
    minHeight: "500px",
  },

  paperHeading: {
    padding: "10px",
    minHeight: "60px",
    backgroundColor: "#7986cb",
    marginBottom: "10px",
    textAlign: "center",
  },
  table: {
    width: "100%",
  },
  textDiv: {
    padding: "5px",
  },
}));

const Cart = (props) => {
  const classes = UseStyles();
  const history = useHistory();
  const onBtnClick = (e, v) => {
    history.push("/Checkout");
  };
  const onAddIconClick = (e, medicineSysid) => {
    var obj = JSON.parse(JSON.stringify(props.orderObj));
    var amount = 0;
    obj.MedicineDetails.forEach((key, index) => {
      if (key["medicineSysid"] === medicineSysid) {
        key["medicineQty"] = key["medicineQty"] + 1;
        key["medicineAmount"] =
          key["priceofMedicine"] * key["medicineQty"] -
          key["medicineDiscount"] * key["medicineQty"];
      }
      amount = amount + key["medicineAmount"];
    });
    if (amount > 0) {
      obj["price"] = amount;
    }
    props.addQtyForMedicine(obj);
  };

  const onRemoveIconClick = (e, medicineSysid) => {
    var obj = JSON.parse(JSON.stringify(props.orderObj));
    var amount = 0;
    obj.MedicineDetails.forEach((key, index) => {
      if (key["medicineSysid"] === medicineSysid && key["medicineQty"] > 0) {
        key["medicineQty"] = key["medicineQty"] - 1;
        key["medicineAmount"] =
          key["priceofMedicine"] * key["medicineQty"] -
          key["medicineDiscount"] * key["medicineQty"];
      }
      amount = amount + key["medicineAmount"];
    });

    if (amount > 0) {
      obj["price"] = amount;
    }
    props.minusQtyForMedicine(obj);
  };

  var medTableData =
    props.orderObj.MedicineDetails !== "" &&
    props.orderObj.MedicineDetails !== undefined ? (<div style={{marginTop:'20px'}}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name </TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price (Per Unit)</TableCell>
              <TableCell align="right">Disount</TableCell>
              <TableCell align="right">Amount </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orderObj.MedicineDetails.map((med) => (
              <TableRow key={med.medicineSysid}>
                <TableCell component="th" scope="row">
                  <Grid container>
                    <Grid xs={3}>
                      <Avatar className={classes.orange}>Tab</Avatar>
                    </Grid>
                    <Grid xs={9}>{med.medicineName}</Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center" availableStock={med.availableStock}>
                  <IconButton aria-label="Remove">
                    <RemoveCircleRoundedIcon
                      onClick={(e) => onRemoveIconClick(e, med.medicineSysid)}
                      style={{ color: green[500] }}
                    />
                  </IconButton>
                  &nbsp; &nbsp;
                  {med.medicineQty}
                  &nbsp; &nbsp;
                  <IconButton
                    aria-label="Add"
                    onClick={(e) => onAddIconClick(e, med.medicineSysid)}
                  >
                    <AddCircleOutlineIcon style={{ color: red[500] }} />
                  </IconButton>
                  <span></span>
                </TableCell>
                <TableCell align="right">{med.priceofMedicine}</TableCell>
                <TableCell align="right">{med.medicineDiscount}</TableCell>
                <TableCell align="right">{med.medicineAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>
    ) : (
      ""
    );

  var proceedButtonBottom = (
    <div style={{ padding: "20px", margin:'10px' }}>
      <Button
        variant="contained"
        style={{ float: "right" }}
        onClick={(e, v) => {
          onBtnClick(e, v);
        }}
      >
        Proceed to Order
      </Button>
      <Button
        variant="contained"
        style={{ float: "right", marginRight: "10px" }}
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </div>
  );

  var cartHeaderData =
    props.orderObj !== "" && props.orderObj !== undefined ? (
      <Grid container spacing={1} justifyContent="flex-end" alignItems="center">
        <Grid item spacing={1} lg={6} sm={6}>
          <div className={classes.textDiv}>
            <b>Store Name :</b>
            {props.orderObj["CompanyName"]}
          </div>
          <div className={classes.textDiv}>
            <b>Store Address : </b>
            {props.orderObj["Store Address"] +
              " ," +
              props.orderObj["Store City"]}
          </div>

          <div className={classes.textDiv}>
            <b>Store Type </b>: {props.orderObj.storeType}
          </div>
          <div className={classes.textDiv}>
            <b>Store Contact Number </b> : {props.orderObj.storeContactNumber}
          </div>
          <div className={classes.textDiv}>
            <b>Store Email Address </b>: {props.orderObj.storeEmailAddress}
          </div>
        </Grid>
        <Grid item spacing={1} lg={6} sm={6}>
          <div className={classes.textDiv}>
            <b>Total Amount </b> : Rs. {props.orderObj["price"]}
          </div>
          <div className={classes.textDiv}>
            <b>Total Discount </b> : Rs. {props.orderObj["discount"]}
          </div>
          <div className={classes.textDiv}>
            <b>Total Amount to Paid </b> : Rs.{" "}
            {props.orderObj["price"] - props.orderObj["discount"]}
          </div>
          <div className={classes.textDiv}></div>
          <div className={classes.textDiv}></div>
          <div className={classes.textDiv}></div>
        </Grid>
      </Grid>
    ) : (
      ""
    );
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item container spacing={1} lg={1} sm={12}></Grid>
        <Grid item container spacing={1} lg={10} sm={12}>
          <div className={classes.mainDiv}>
            <Paper className={classes.paper} elevation={1}>
              <div>
                <Typography component="h1" variant="h4" align="center">
                  Your Cart
                </Typography>
                <div style={{marginTop: "10px", borderBottom: "5px solid #e8e8e8", padding: "10px",}}></div>
              </div>
              <div className={classes.medicineTblDiv}>
                {cartHeaderData}
                {medTableData}
                {proceedButtonBottom}
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
  console.log(state.cart);
  return {
    orderObj: state.cart.orderObj,
    data: state.cart,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addQtyForMedicine: (orderObj) => dispatch(actions.addQty(orderObj)),
    minusQtyForMedicine: (orderObj) => dispatch(actions.minusQty(orderObj)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cart);

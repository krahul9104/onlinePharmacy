import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid} from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./Payment";
import Review from "./Review";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cart";
import {useHistory} from "react-router-dom";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e1f5fe",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
     
  },

  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
    marginTop:'10px;',
    minHeight: "500px",
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = (props) => {
  const classes = useStyles();
  const history = useHistory();

   const [oderPlaced, setoderPlaced] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if(activeStep === 2){
    var obj={
    userId:props.userId,
    ShopId:props.orderObj.Companysysid,
    userObj:props.userObj,
    cardObj:props.cardObj,
    orderedMedicines : props.orderObj.MedicineDetails,
    totalAmount:props.orderObj.price
    }
    
   // alert(JSON.stringify(obj));
      props.saveOrder(obj);
    }
    setActiveStep(activeStep + 1);
  };
  
  const handleBackonCheckout = () => {
    history.goBack();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const orderMsg= ( !props.saveOrderLoading ? (<div>
    <Typography variant="h5" gutterBottom>
      Thank you for your order.
    </Typography>
    <Typography variant="subtitle1">
      Your order number is {props.orderNumber} We have emailed your order
      confirmation, and will send you an update when your order has
      shipped.
    </Typography>
    <div>
      <Button 
        variant="contained"
        onClick={(e)=>{setoderPlaced(true)}} 
        className={classes.button}>
          Return to Home
        </Button></div>
  </div>): <CircularProgress /> );

  var err= (props.error !=='' && props.error ===undefined)? <div>Error while processing your request -{props.error}</div>:''; 

  var checkoutDiv = (
    <Paper className={classes.paper}>
      <div>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
      </div>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{minHeight:'500px',}}>
        {activeStep === steps.length ? 
         orderMsg
        : (
          <div >
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
            {activeStep === 0 && (
                <Button 
                variant="contained"
                onClick={handleBackonCheckout} 
                className={classes.button}>
                  Back
                </Button>
              )}
              {activeStep !== 0 && (
                <Button 
                variant="contained"
                onClick={handleBack} 
                className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Paper>
  );

  return (
      <div style={{backgroundColor:'#e1f5fe',minHeight:'800px' }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <div>{checkoutDiv}</div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
         {err}
         {oderPlaced? <Redirect to="/Homepage" /> : ""}
        </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderObj: state.cart.orderObj,
    userObj: state.cart.userObj,
    cardObj: state.cart.cardObj,
    userId: state.auth.userId,
    orderNumber:state.cart.orderNumber,
    saveOrderLoading:state.cart.saveOrderLoading,
    error:state.cart.error
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    saveOrder: (obj) =>
    dispatch(actions.saveOrder(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Checkout);

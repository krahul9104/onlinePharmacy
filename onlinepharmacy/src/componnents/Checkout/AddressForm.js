import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";
import * as actions from "../../store/actions/cart";

const UseStyles = makeStyles((theme) => ({
  
}));

const AddressForm=(props)=> {

  const classes= UseStyles();
  const onChangeUserObj=(e,v,fieldName) =>{
       var obj =JSON.parse(JSON.stringify(props.userObj));
       obj[fieldName]=e.target.value;
       props.onChangeOfField_USER(obj);
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
           variant="outlined"
            className ={classes.txtField}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value ={props.userObj.firstName}
            onChange ={(e,v)=> onChangeUserObj(e,v,'firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          variant="outlined"
          className ={classes.txtField}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={props.userObj.lastName}
            onChange ={(e,value)=> onChangeUserObj(e,value,'lastName')}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
          className ={classes.txtField}
          variant="outlined"
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            value={props.userObj.address}
            onChange ={(e,v)=> onChangeUserObj(e,v,'address')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <TextField
          className ={classes.txtField}
          variant="outlined"
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={props.userObj.city}
            onChange ={(e,v)=> onChangeUserObj(e,v,'city')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state"
          variant="outlined"
          className ={classes.txtField}
           name="state"
            label="State/Province/Region" 
            fullWidth
            value={props.userObj.state_Country}
            onChange ={(e,v)=> onChangeUserObj(e,v,'state_Country')}  />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="outlined"
            className ={classes.txtField}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={props.userObj.zipcode}
            onChange ={(e,v)=> onChangeUserObj(e,v,'zipcode')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          variant="outlined"
          className ={classes.txtField}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={props.userObj.country}
            onChange ={(e,v)=> onChangeUserObj(e,v,'country')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" variant="outlined" value="yes"onChange ={(e,v)=> onChangeUserObj(e,v,'sameAddressforPayment')} />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userObj :state.cart.userObj,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onChangeOfField_USER: (userObj) =>
    dispatch(actions.onChangeOfField_USER(userObj)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddressForm);
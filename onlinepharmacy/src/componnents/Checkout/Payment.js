import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";
import * as actions from "../../store/actions/cart";

const PaymentForm =(props)=> {

  const onChangecardObj=(e,v,fieldName) =>{
    var objCart =JSON.parse(JSON.stringify(props.cardObj));
    objCart[fieldName]=e.target.value;
    props.onChangeOfField_Cart(objCart);
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" 
          label="Name on card" 
          fullWidth autoComplete="cc-name" 
          value ={props.cardObj.nameOnCard}
          variant="outlined"
          onChange ={(e,v)=> onChangecardObj(e,v,'nameOnCard')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            variant="outlined"
            fullWidth
            autoComplete="cc-number"
            value={props.cardObj.cardCCNumber}
            onChange ={(e,v)=> onChangecardObj(e,v,'cardCCNumber')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate"
           label="Expiry date" 
           variant="outlined"
           fullWidth 
           autoComplete="cc-exp"
           value={props.cardObj.cardExpDate}
            onChange ={(e,v)=> onChangecardObj(e,v,'cardExpDate')}
           />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            variant="outlined"
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            type="password"
            autoComplete="cc-csc"
            value={props.cardObj.cardCVV}
            onChange ={(e,v)=> onChangecardObj(e,v,'cardCVV')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
          variant="outlined"
            control={<Checkbox color="secondary"
             name="saveCard" 
             value={props.cardObj.remeberCard}
             onChange ={(e,v)=> onChangecardObj(e,v,'remeberCard')}
             />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log(state.cart.cardObj);
  return {
    cardObj :state.cart.cardObj,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onChangeOfField_Cart: (cardObj) =>
    dispatch(actions.onChangeOfField_CART(cardObj)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PaymentForm);
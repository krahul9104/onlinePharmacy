import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review =(props) =>{
  const classes = useStyles();

   

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <div style={{ borderBottom: "4px solid #e8e8e8",margin: "5px"}}></div>
      <List >
        {props.orderObj.MedicineDetails.map((med) => (
          <div >
           <Grid container spacing={5}>
             <Grid item sm={4} lg={4} md={4} style={{textAlign:'left'}}><b>{med.medicineName}</b></Grid>
             <Grid item sm={4} lg={4} md={4} style={{textAlign:'left'}}>{med.medicineQty}</Grid>
             <Grid item sm={4} lg={4} md={4} style={{textAlign:'right'}}>{med.priceofMedicine}</Grid>
           </Grid>
          </div>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total Amout to Paid after Discount" />
          <Typography variant="subtitle1" className={classes.total}>
             {props.orderObj.price - props.orderObj.discount}
          </Typography>
        </ListItem>
        
        <div style={{ borderBottom: "4px solid #e8e8e8",margin: "5px",}}></div>
      </List>
      <Grid container spacing={2} style={{marginTop:'15px'}}>
        <Grid item xs={12} sm={6} style ={{borderRight:'1px solid #e8e8e8'}}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.userObj.firstName +' '+props.userObj.lastName}</Typography>
          <Typography gutterBottom>
            <div>
            {props.userObj.address}
            </div>
            <div>
            {props.userObj.city + ' '+ props.userObj.state_Country +' ' +props.userObj.zipcode}
            </div>
            </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container >
              <React.Fragment key={props.cardObj.nameOnCard}>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    <div>Card holder</div>
                    <div>Card number</div>
                    <div>Expiry date</div>
                    <div>Remember Card </div>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography gutterBottom>
                    <div>{props.cardObj.nameOnCard}</div>
                    <div>{props.cardObj.cardCCNumber}</div>
                    <div>{props.cardObj.cardExpDate}</div>
                    <div>{props.cardObj.remeberCard}</div>
                    </Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log(state.cart);
  return {
    orderObj:state.cart.orderObj,
    userObj :state.cart.userObj,
    cardObj:state.cart.cardObj
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Review);
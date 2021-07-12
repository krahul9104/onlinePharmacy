import React from "react";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Marker from "./Marker";
import MapList from "./MapList";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green,grey } from '@material-ui/core/colors';
import StoreIcon from '@material-ui/icons/Store';
import Button from '@material-ui/core/Button'

const UseStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  bstResPaper:{
    padding:'10px', 
    marginTop:'10px',
    marginBottom:'10px',
    backgroundColor:'#f1f8e9',
    minHeight:'100px;'

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
    width:'70%',
    height:'70%'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },  

}));

const Map = (props) => {
  const classes = UseStyles();

  const defaultProps = {
    center: { lat: 17.4504, lng: 78.3808 },
    zoom: 12,
  };


  const bestResult = (<Paper className={classes.bstResPaper} >
    <Grid container spacing={2}>
          <Grid item lg={1}>
            <ButtonBase className={classes.image} style={{ border:'1px solid #e8e8e8' }}>
              <Avatar variant="square" className={classes.square} style={{ color: deepOrange[500] }}>
                <StoreIcon ></StoreIcon></Avatar>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container >
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 <b> Store Name </b>
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  <b>Store Average Disctance from your Location : </b>{props['Distance of Store']}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <div> Address : {props['Store Address'] +' '+props['Store City'] +' '+ 500081}</div>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                </Typography>
              </Grid>
              <Grid item >
                <Button variant="contained">Order</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Total Price : $19.00</Typography>
              <Typography variant="subtitle1">Discount    : $19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
        </Paper>)
  return (
    <div>     
      <Paper className={classes.paper} style={{padding:'10px'}}>
      <Grid container spacing={5}>
        <Grid item lg={8} md={6} sm={6} xs={12}>
              <div style={{ width: "100%", height: (props.data.length >5 ? props.data.length*200 : 600)+'px' }}>
                <GoogleMapReact
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  {props.data.map((loc, index) => (
                    <Marker
                      lat={loc["Store Latitide"]}
                      lng={loc["Store Longitude"]}
                      name={loc["CompanyName"]}
                      price={loc["price"]}
                      hoverkey ={props.hoverkey}
                      store_id ={loc.medicineId}
                    />
                  ))}
                </GoogleMapReact>
              </div>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
            {props.data.map((loc, index) => (
              <MapList {...loc} store_name ={loc["CompanyName"]} medicineDescription={loc.medicineDescription} store_id={loc.medicineId} />
            ))}
        </Grid>
      </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
   console.log("data from store-------"+JSON.stringify(state.search.key));
  return {
    isLoading: state.search.loading,
    userLoc: state.search.userLoc,
    data: state.search.data,
    hoverkey: state.search.key
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchtoProps)(Map);

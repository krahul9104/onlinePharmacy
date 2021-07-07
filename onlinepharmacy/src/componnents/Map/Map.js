import React from "react";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Marker from "./Marker";
import MapList from "./MapList";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const UseStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const Map = (props) => {
  const classes = UseStyles();

  const defaultProps = {
    center: { lat: 17.4504, lng: 78.3808 },
    zoom: 12,
  };

  return (
    <div>
      <Paper className={classes.paper} style={{padding:'10px',height:'100px', marginTop:'10px',marginBottom:'10px'}}>Best Result</Paper>
      <Paper className={classes.paper} style={{padding:'10px'}}>
      <Grid container spacing={5}>
        <Grid item lg={8} md={6} sm={6} xs={12}>
              <div style={{ width: "100%", height: "800px" }}>
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
                    />
                  ))}
                </GoogleMapReact>
              </div>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
            {props.data.map((loc, index) => (
              <MapList {...loc} />
            ))}
        </Grid>
      </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.search.loading,
    userLoc: state.search.userLoc,
    data: state.search.data,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchtoProps)(Map);

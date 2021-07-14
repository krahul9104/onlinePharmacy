import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Marker from "./Marker";
import MapList from "./MapList";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { deepOrange, grey, green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import StoreIcon from "@material-ui/icons/Store";
import * as actions from "../../store/actions/search";

const UseStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  bstResPaper: {
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#f1f8e9",
    minHeight: "100px;",
  },
  image: {
    width: "100px",
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
    width: "30%",
    height: "30%",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  SearchHdDiv: {
    padding: "2px",
  },
}));

const Map = (props) => {
  const classes = UseStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortByTxt, setsortByTxt] = React.useState("Delivery Time");

  const defaultProps = {
    center: { lat: 17.4323, lng: 78.3815 },
    zoom: 12,
  };
  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, val) => {
    if (val !== "") {
      setsortByTxt(val);
      props.onSortBy(val);
    }
    setAnchorEl(null);
  };

  const sortSelect = (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        &nbsp; Sort By : {sortByTxt}
        &nbsp; <SortIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          handleClose(e, "");
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleClose(e, "Delivery Time");
          }}
        >
          Delivery Time
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose(e, "Price");
          }}
        >
          Price
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose(e, "Distance");
          }}
        >
          Distance
        </MenuItem>
      </Menu>
    </div>
  );
  return (
    <div>
      <Paper className={classes.paper} style={{ padding: "10px" }}>
        <Grid container spacing={1} className={classes.SearchHdDiv}>
          <Grid item lg={8} md={8} sm={6} xs={12}>
            <b>Search Results</b>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12} align="right">
            <Grid container spacing={1} align="center">
              <Grid item lg={3} md={3}>
                {" "}
                <ButtonBase className={classes.image}>
                  <Avatar
                    variant="square"
                    className={classes.square}
                    style={{
                      color: green[500],
                    }}
                  >
                    <StoreIcon> </StoreIcon>
                  </Avatar>
                  <b> &nbsp; OffLine Store</b>
                </ButtonBase>
              </Grid>
              <Grid item lg={3} md={3}>
                <ButtonBase className={classes.image}>
                  <Avatar
                    variant="square"
                    className={classes.square}
                    style={{
                      color: deepOrange[500],
                    }}
                  >
                    <StoreIcon></StoreIcon>
                  </Avatar>
                  <b> &nbsp; Online Store</b>
                </ButtonBase>
              </Grid>
              <Grid item lg={6} md={6}>
                {sortSelect}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item lg={8} md={6} sm={6} xs={12}>
            <div
              style={{
                width: "100%",
                minHeight: "500px",
                height:props.data.length * 260 + "px",
              }}
            >
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
                    store_id={loc.Companysysid}
                    hoverkey={props.hoverkey}
                  />
                ))}
                <Marker
                  lat={defaultProps.center.lat}
                  lng={defaultProps.center.lng}
                  name={"Your are Here "}
                  userLoc={true}
                />
              </GoogleMapReact>
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {props.data.map((loc, index) => (
              <MapList
                {...loc}
                store_name={loc["CompanyName"]}
                medicineDescription={loc.medicineDescription}
                store_id={loc.Companysysid}
                index={index}
              />
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
    hoverkey: state.search.key,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onSortBy: (sortBy) => dispatch(actions.sortSearchData(sortBy)),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Map);

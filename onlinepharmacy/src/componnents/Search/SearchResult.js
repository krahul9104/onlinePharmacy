import React from "react";
import { connect } from "react-redux";
import Map from "../Map/Map";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";

const UseStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  centerDiv: {
    margin: "auto",
    width: "15%",
  },
}));
const SearchResult = (props) => {
  const classes = UseStyles();
    const displayData =props.isLoading ? <div className ={classes.centerDiv}><CircularProgress style ={{padding:'10px'}} /></div> : <div style ={{marginTop:'10px'}}><Map /></div>;  
  return (
    <div>
       {
           props.medicineIdArr.length >0 ? displayData:<div> </div>
       }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.search.loading,
    medicineIdArr :state.search.medicineIdArr
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchtoProps)(SearchResult);

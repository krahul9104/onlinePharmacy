import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as actions from "../../store/actions/search";
import { connect } from "react-redux";
import * as apiDefaults from "../../../src/apiDefaultValues";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

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
const Search = (props) => {
  const classes = UseStyles();
  const [isLoading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [medicineSysIds, setMedicineSysIds] = useState([]);
  const [userLoc, setUserLoc] = useState({
    lat: 17.51076335256882,
    lng: 78.38575149753446,
  });
  const [distance, setdistance] = React.useState(props.data.distance);
  const [storeType, setstoreType] = React.useState(props.data.storeType);

  useEffect(() => {
    const fetchMedicine = async () => {
      const headers = {
        Authorization: apiDefaults.BASIC_AUTH,
      };
      const response = await fetch(apiDefaults.GET_MED_LIST_API, { headers });
      const responseData = await response.json();
      var medicineArr = [];
      responseData["result"].forEach((key) => {
        medicineArr.push({
          label: key.u_medicine_name,
          value: key.sys_id,
        });
      });
      setLoading(true);
      setMedicines(medicineArr);
    };
    fetchMedicine();
  }, []);

  const onChangeFilter = (event, value) => {
    var sys_ids = [];
    if (value.length > 0) {
      value.forEach((key) => {
        sys_ids.push(key.value + "");
      });
    }
    setMedicineSysIds(sys_ids);
  };

  const onBtnClick = (e, val) => {
    if (medicineSysIds.length > 0) {
       props.onSearch(medicineSysIds, userLoc, distance,storeType);
    }
  };

  useEffect(() => {
    if (medicineSysIds.length > 0) {
     // props.onSearch(medicineSysIds, userLoc,distance,storeType);
    }
  }, [medicineSysIds]);

  const distanceLOV = [
    { value: "None", label: "None" },
    { value: 40, label: "Within 40 km" },
    { value: 80, label: "Within 80km" },
    { value: 120, label: "Within 120 km" },
    { value: "100000", label: "Anywhere" },
  ];

  const storeTypeLOV = [
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
    { value: "Both", label: "Both" },
  ];



  const handleChangeDis = (event) => {
    setdistance(event.target.value);
  };

  const handleChangeStore = (event) => {
    setstoreType(event.target.value);
  };

  var selectDisDiv = (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Distance"
        value={distance}
        onChange={handleChangeDis}
        variant="outlined"
        style={{width: '80%', textAlign:'left'}}
      >
        {distanceLOV.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );

  var selectTypeDiv = (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Store Type"
        value={storeType}
        onChange={handleChangeStore}
        variant="outlined"
        style={{width: '80%',textAlign:'left'}}
      >
        {storeTypeLOV.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );

  var searchInputDiv = (
    <div>
      <Autocomplete
        multiple
        id="tags-outlined"
        loading={isLoading}
        options={medicines}
        getOptionLabel={(option) => option.label}
        onChange={(e, v) => onChangeFilter(e, v)}
        filterSelectedOptions
        value={props.medicineIdArr}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search Medicine"
            placeholder="Search Medinine Name Here"
          />
        )}
      ></Autocomplete>
    </div>
  );

  return (
    <div className={classes.root}>
      {isLoading ? 
        <div>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} >
              {searchInputDiv}
            </Grid>
            <Grid item lg={2} md={2} sm={12} >
              {selectDisDiv}
            </Grid>
            <Grid item lg={2} md={2} sm={12} >
              {selectTypeDiv}
            </Grid>
            <Grid item lg={2} md={2} sm={12} s>
              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                  onClick={(e, v) => onBtnClick(e, v)}
                >
                  Search
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
       : (
        <div>
          <div className={classes.centerDiv}>
            <CircularProgress />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data:state.search,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onSearch: (medicineSysIds, userLoc,distance,storeType) =>
      dispatch(actions.onSearch(medicineSysIds, userLoc,distance,storeType)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Search);

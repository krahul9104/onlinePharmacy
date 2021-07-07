import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as actions from "../../store/actions/search";
import { connect } from "react-redux";
import * as apiDefaults from "../../../src/apiDefaultValues";

const UseStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));
const Search = (props) => {
  const classes = UseStyles();
  const [isLoading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [medicineSysIds, setMedicineSysIds] = useState([]);
  const [userLoc, setUserLoc] = useState({
      lat: 17.51076335256882,
      lng: 78.38575149753446
  })
  useEffect(() => {
    const fetchMedicine = async () => {
      const headers = {
        Authorization: apiDefaults.BASIC_AUTH,
      };
      const response = await fetch(
        apiDefaults.GET_MED_LIST_API,
        { headers }
      );
      const responseData = await response.json();
      var medicineArr = [];
      responseData["result"].map((key) => {
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
      value.map((key) => {
        sys_ids.push(key.value + "");
      });
    }
    setMedicineSysIds(sys_ids);  
  };

  const onBtnClick = (e, val) => {
    props.onSearch(medicineSysIds, userLoc);
  };

  useEffect(() => {
    if(medicineSysIds.length>0){
      props.onSearch(medicineSysIds, userLoc);
    }
  }, [medicineSysIds])

  return (
    <div className={classes.root}>
      {isLoading ? (
        <div>
          <Autocomplete
            multiple
            id="tags-outlined"
            loading={isLoading}
            options={medicines}
            getOptionLabel={(option) => option.label}
            onChange={(e, v) => onChangeFilter(e, v)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search Medicine"
                placeholder="Search Medinine Name Here"
              />
            )}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.margin}
              onClick={(e, v) => onBtnClick(e, v)} >
              Search
            </Button>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: JSON.stringify(state),
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onSearch: (medicineSysIds,userLoc) => dispatch(actions.onSearch(medicineSysIds,userLoc)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Search);

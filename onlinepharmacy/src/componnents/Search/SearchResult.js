import React from "react";
import { connect } from "react-redux";
import Map from "../Map/Map";

const SearchResult = (props) => {

    const displayData =props.isLoading ? (
        <div>Loading The data ........ </div>
      ) : (
        <div>
          <Map />
        </div>
      );  
  return (
    <div>
       {
           props.medicineIdArr.length >0 ? displayData:''
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

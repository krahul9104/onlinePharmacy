import * as actionTypes from "../actions/actionTypes";
import * as apiDefaults from "../../apiDefaultValues";

export const getSearchStart = (medicineIdArr, userLoc,distance,storeType) => {
  return {
    type: actionTypes.GET_SEARCH_DATA_START,
    medicineIdArr: medicineIdArr,
    userLoc: userLoc,
    hoverEle:'',
    distance:distance,
    storeType:storeType
  };
};

export const getSearchSuccess = (data) => {
  return {
    type: actionTypes.GET_SEARCH_DATA_SUCCESS,
    data: data,
  };
};

export const sortSearchData = (sortBy) => {
  return {
    type: actionTypes.SORT_SEARCH_DATA,
    sortby:sortBy
  };
};


export const getSearchFail = (error) => {
  return {
    type: actionTypes.GET_SEARCH_DATA_FAIL,
    error: error,
  };
};

export const setKeyOnHover = (store_id) => {
  return {
    type: actionTypes.SET_KEY_ON_HOVER,
    store_id: store_id
  };
};

export const onSearch = (medicineIdsArr, userLoc,distance,storeType) => {
  return (dispatch) => {
    dispatch(getSearchStart(medicineIdsArr, userLoc));
    /*var obj = {
      medicineIds: medicineIdsArr.join(","),
      userLoc: userLoc,
    };*/

    var apiParam = {
      latitude: userLoc.lat.toString(),
      longitude: userLoc.lng.toString(),
      medicines: [],
      distanceSearch:distance,
      storeType:storeType
    };

    medicineIdsArr.map((sysId) => {
      apiParam.medicines.push({
        medicineId: sysId+'',
      });
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/json;",
        Authorization: apiDefaults.BASIC_AUTH,
      },
      body: JSON.stringify(apiParam),
    };
  
    fetch(
      apiDefaults.GET_SEARCH_DATA_API,
      requestOptions
    ).then((res) =>
        res.json())
      .then(
        (responseData) => {
          dispatch(getSearchSuccess(responseData["result"]["data"]));
        },
        (error) => {
          dispatch(getSearchFail(error));
        }
      );
  };
};

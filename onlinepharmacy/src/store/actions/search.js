import * as actionTypes from "../actions/actionTypes";
import * as apiDefaults from "../../apiDefaultValues";

export const getSearchStart = (medicineIdArr, userLoc) => {
  return {
    type: actionTypes.GET_SEARCH_DATA_START,
    medicineIdArr: medicineIdArr,
    userLoc: userLoc,
  };
};

export const getSearchSuccess = (data) => {
  return {
    type: actionTypes.GET_SEARCH_DATA_SUCCESS,
    data: data,
  };
};

export const getSearchFail = (error) => {
  return {
    type: actionTypes.GET_SEARCH_DATA_FAIL,
    error: error,
  };
};

export const onSearch = (medicineIdsArr, userLoc) => {
  return (dispatch) => {
    dispatch(getSearchStart(medicineIdsArr, userLoc));
    var obj = {
      medicineIds: medicineIdsArr.join(","),
      userLoc: userLoc,
    };

    const apiParam = {
      latitude: userLoc.lat,
      longitude: userLoc.lng,
      medicines: [],
    };
    medicineIdsArr.map((sysId) => {
      apiParam.medicines.push({
        medicineId: sysId,
      });
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/json",
        Authorization: apiDefaults.BASIC_AUTH,
      },
      body: JSON.stringify(apiParam),
    };

    fetch(
      apiDefaults.GET_SEARCH_DATA_API,
      requestOptions
    )
      .then((res) => res.json())
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

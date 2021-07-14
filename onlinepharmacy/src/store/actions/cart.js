import * as actionTypes from "../actions/actionTypes";
import * as apiDefaults from "../../apiDefaultValues";

export const addQty = (orderObj) => {
  return {
    type: actionTypes.ADD_QTY,
    orderObj:orderObj
  };
};

export const minusQty = (orderObj) => {
  return {
    type: actionTypes.MINUS_QTY,
    orderObj: orderObj,
  };
};

export const onOrder = (orderObj) => {
  return {
    type: actionTypes.ON_ORDER,
    orderObj: orderObj
  };
};

export const onChangeOfField_USER=(userObj) =>{
  return {
    type: actionTypes.ON_CHANGE_USER_FLD,
    userObj:userObj
  };
}

export const onChangeOfField_CART=(cardObj) =>{
  return {
    type: actionTypes.ON_CHANGE_PAY_FLD,
    cardObj:cardObj
  };
}


export const saveOrderStart=() =>{
  return {
    type: actionTypes.SAVE_ORDER_STAR
  };
}
export const saveOrderSuccess=(orderNumber) =>{
  return {
    type: actionTypes.SAVE_ORDER_SUCCESS,
    orderNumber:orderNumber
  };
}

export const saveOrderFail=(error) =>{
  return {
    type: actionTypes.SAVE_ORDER_FAIL,
    error:error
  };
}

export const saveOrder = (obj) => {
  return (dispatch) => {
    dispatch(saveOrderStart());
    const requestOptions = apiDefaults.POST_API_HEADER(obj);
    
    console.log("data sent to DB" +JSON.stringify(obj));
    fetch(
      apiDefaults.SAVE_ORDER_API,
      requestOptions
    ).then((res) =>
        res.json())
      .then(
        (responseData) => {
          dispatch(saveOrderSuccess(responseData["result"]["orderNumber"]));
        },
        (error) => {
          dispatch(saveOrderFail(error));
        }
      );
  };
};






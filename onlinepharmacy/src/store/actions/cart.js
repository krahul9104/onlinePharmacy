import * as actionTypes from "../actions/actionTypes";

export const addQty = (medicineId) => {
  return {
    type: actionTypes.ADD_QTY,
    medicineId:medicineId
  };
};

export const minusQty = (medicineId) => {
  return {
    type: actionTypes.MINUS_QTY,
    medicineId: medicineId,
  };
};






import * as actionTypes from "../actions/actionTypes";

const intialState = {
  loading: true,
  error:false,
  userLoc:'',
  medicineIdArr:[],
  data :[],
};

const search_reducer = (state = intialState, action) => {

  switch (action.type) {
    case actionTypes.GET_SEARCH_DATA_START:
      return {
        ...state,
        loading: true,
        userLoc: action.userLoc,
        medicineIdArr: action.medicineIdArr
      };

    case actionTypes.GET_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data : action.data,
      };

    case actionTypes.GET_SEARCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorData:action.error,
        error :'Error while fetching the data'
      };

    default: {
      return state;
    }
  }
};
export default search_reducer;
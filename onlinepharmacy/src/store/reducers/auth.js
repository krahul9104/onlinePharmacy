import * as actionTypes from "../actions/actionTypes";

const intialState = {
  email: "",
  password: "",
  error:false,
  loading: false,
};

const auth_reducer = (state = intialState, action) => {

  switch (action.type) {
    case actionTypes.AUTH_START:
      console.log('AUTH_START')  ;
      return {
        ...state,
        loading: true,
      };

    case actionTypes.AUTH_SUCCESS:
        console.log('AUTH_SUCCESS')  ;
      return {
        ...state,
        loading: false,
        data : action.authData,
        response :'User Present'
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        errorData:action.error,
        error :'User Present'
      };

    default: {
      return state;
    }
  }
};
export default auth_reducer;

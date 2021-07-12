import * as actionTypes from "../actions/actionTypes";


const intialState = {
  email: "",
  isValidUser:false,
  error:'',
  loading: false,
  userId : ''
};

const auth_reducer = (state = intialState, action) => {

  switch (action.type) {
    case actionTypes.AUTH_START:
      console.log('AUTH_START')  ;
      return {
        ...state,
        loading: true,
        email:action.email,
        isValidUser:false,
        error :'',
        userId:''
      };

    case actionTypes.AUTH_SUCCESS:
        console.log('AUTH_SUCCESS')  ;
      return {
        ...state,
        loading: false,
        isValidUser:true,
        response :'User Present',
        userId:action.authData.userId,
        data : action.authData
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        email:action.email,
        errorData:action.error,
        error :'User Present/Password is not Correct. Please try again',
        isValidUser:false,
        userId:''
      };

    default: {
      return state;
    }
  }
};
export default auth_reducer;

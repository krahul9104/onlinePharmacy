import * as actionTypes from "../actions/actionTypes";

const intialState = {
  saveOrderLoading:false,
  orderNumber:'',
  loading: true,
  error:'',
  orderObj : {},
  userObj:{
    firstName:'Rahul',
    lastName:'',
    address:'',
    city:'',
    state_Country: '',
    zipcode:'',
    country:'',
    sameAddressforPayment:'yes'
  },
  cardObj:{
    nameOnCard:'',
    cardCCNumber:'',
    cardExpDate:'',
    cardCVV:'',
    remeberCard:'Yes'
  }
};

const search_reducer = (state = intialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_QTY:
      return {
        ...state,
        orderObj:action.orderObj
      };

    case actionTypes.MINUS_QTY:
      return {
        ...state,
        orderObj:action.orderObj
      };

    case actionTypes.ON_ORDER:
    return {
          ...state,
          orderObj:action.orderObj
    };  
    case actionTypes.ON_CHANGE_USER_FLD:
    return {
          ...state,
          userObj:action.userObj
    };  

    case actionTypes.ON_CHANGE_PAY_FLD:
    return {
          ...state,
          cardObj:action.cardObj
    };  

    case actionTypes.SAVE_ORDER_STAR:
      return {
            ...state,
            saveOrderLoading:true
      };
      case actionTypes.SAVE_ORDER_SUCCESS:
        return {
              ...state,
              saveOrderLoading:false,
              orderObj:{},
              userObj:{},
              cardObj:{},
              orderNumber:action.orderNumber
        };
        case actionTypes.SAVE_ORDER_FAIL:
          return {
                ...state,
                saveOrderLoading:false,
                error:action.error
          };
    default: {
      return state;
    }
  }
};
export default search_reducer;
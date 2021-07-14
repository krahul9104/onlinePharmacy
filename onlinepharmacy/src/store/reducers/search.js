import * as actionTypes from "../actions/actionTypes";

const intialState = {
  loading: true,
  error:false,
  userLoc:'',
  medicineIdArr:[],
  data :[],
  key:'',
  distance:100000,
  storeType:'Both'
};

const search_reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_SEARCH_DATA:
      return {
        ...state,
        loading: true,
        error:false,
        userLoc:'',
        medicineIdArr:[],
        data :[],
        key:'',
        distance:100000,
        storeType:'Both'
      };

    case actionTypes.GET_SEARCH_DATA_START:
      return {
        ...state,
        loading: true,
        userLoc: action.userLoc,
        storeType:action.storeType,
        distance:action.distance,
        medicineIdArr: action.medicineIdArr
      };

    case actionTypes.GET_SEARCH_DATA_SUCCESS:
      var obj=sortData(action.data, 'Delivery Time');
      return {
        ...state,
        loading: false,
        data : obj,
      };

    case actionTypes.GET_SEARCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorData:action.error,
        error :'Error while fetching the data'
      };

    case actionTypes.SET_KEY_ON_HOVER:
        return {
          ...state,
          key:action.store_id
        };
        
    case actionTypes.SORT_SEARCH_DATA: {
       var obj=sortData(state.data, action.sortby);
      return {
        ...state,
        data:obj
      };
    }
  
    default: {
      return state;
    }
  }
};


const sortData = (data, sortBy )=>{
   var obj = data;
   var value='deliveryTime'; 
   if(sortBy ==='Price'){
    value='price';
   }

   if(sortBy ==='Delivery Time'){
    value='deliveryTime';
   }

   if(sortBy ==='Distance'){
    value='Distance of Store';
   }
   

   /*obj.sort(function (a, b) {
      return a[value] - b[value] ;
  });*/

  obj.sort((a, b) => b['No of Search Medicine Available'] - a['No of Search Medicine Available'] || a[value] -b[value]);
  return obj;
}
export default search_reducer;
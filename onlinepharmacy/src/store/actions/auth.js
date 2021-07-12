import * as actionTypes from "../actions/actionTypes";
import * as apiDefaults from "../../../src/apiDefaultValues";
export const authStart =(email) =>{
    return {
        type:actionTypes.AUTH_START,
        email:email
    };
}

export const authSuccess =(authData) =>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData :authData
    };
}

export const authFail =(error,email) =>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error,
        email:email
    };
}

export const auth =(email,password)=>{
    return dispatch =>{
        dispatch(authStart(email));

        const apiParam = {
                username: email,
                password: password
          };
       
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
            apiDefaults.GET_USER_API,
            requestOptions
          )
            .then((res) => res.json())
            .then(
              (responseData) => {
                  //console.log("GET_USER_API---auth data from api --------->  " +JSON.stringify(responseData));
                 if(responseData["result"]["status"] ==='true'){
                    dispatch(authSuccess(responseData["result"]));
                 }else{
                    dispatch(authFail(responseData["result"]['validation'],email));
                 }
                  
              },
              (error) => {
                dispatch(authFail(error,email));
              }
            );
    };
}



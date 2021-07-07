import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducer from "../src/store/reducers/index";
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';

/*axios.defaults.baseURL="";
axios.defaults.headers.common['']='';

axios.intercepter.request.use(
  request =>{
    console.log(request);
    //edit request
    return request;
  },error =>{
    console.log(error);
    return Promise.reject(error);
  });
  axios.intercepter.response.use(
    response =>{
      console.log(response);
      //edit request
      return response;
    },error =>{
      console.log(error);
      return Promise.reject(error);
    });
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
   applyMiddleware(thunk)
 ));

var app=(<Provider store={store}>
 <BrowserRouter>
   <App/>
 </BrowserRouter>
</Provider>);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

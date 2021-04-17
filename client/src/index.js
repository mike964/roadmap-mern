import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
// import '@fortawesome/fontawesome-free/css/all.css'
import './css/index.css'
import './css/navbar.css'
import './css/moslm-css.css'
import './css/colors.css'
import './css/bootstrap-fix.css'
import App from './App'
import store from './redux/store'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux';



// eslint-disable-next-line no-undef
console.log( process.env.NODE_ENV )   // development 
console.log( process.env.REACT_APP_API_URL )   // good
// console.log( process.env.REACT_APP_FAKE_API )   // good

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>
  , document.getElementById( 'root' )
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

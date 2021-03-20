/* eslint-disable no-undef */
import axios from 'axios'

const node_env = process.env.NODE_ENV // 'production'  

const axos = axios.create( {
  withCredentials: true,   // Send Cookie to server to retrieve user when login with Passport js
  // *** 'https://some-domain.com/api/',
  // baseURL: ( node_env === 'development' ? process.env.REACT_APP_SERVER : '' ),   // http://localhost:5000
  // baseURL: ( node_env === 'development' ? 'http://localhost:5000' : 'https://roadmap-mern.herokuapp.com' ),   // http://localhost:5000
  // baseURL: 'https://roadmap-mern.herokuapp.com',   // http://localhost:5000
  // baseURL: '/'    // FOR PRODUCTION
  // headers: {'X-Custom-Header': 'foobar'}

  // `headers` are custom headers to be sent
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  // headers: { 'Authorization': ( token ? `Bearer ${ token }` : '' ) }   // *** FOR JWT
  // headers: { 'Authorization': `Bearer ${ token }` }   // *** FOR JWT
  // For Bearer tokens and such, use `Authorization` custom headers.

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
  }
} )

export default axos
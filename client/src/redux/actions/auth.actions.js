/* eslint-disable no-undef */
import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../store'
import { getMyProjects, getProjectsOfUserFromDB } from './project.actions'
import { getStepsOfUserFromDB } from './step.actions'
import axos from '../../utils/axos'
import { axios_get } from '../../utils/fake_api'
import { fake_api_active } from '../../utils/global_vars'
const { dispatch } = store

// Register new User
export const signupUser = async (user) => {
  try {
    // setLoading();

    console.log(user)
    // const res = await fetch( '/users', {
    //   method: 'POST',
    //   body: JSON.stringify( user ),
    //   headers: { 'Content-Type': 'application/json' }
    // } )

    // console.log( process.env.REACT_APP_API_URL )
    const response = await axos.post(`/api/auth/register`, user)

    // console.log( response )

    if (response.data.success) {
      Cookies.set('rodmptoken', response.data.token, { expires: 7 })
      // loadUser()
    }
  } catch (err) {
    console.log(err)
  }
}

export const loginUser = async (user) => {
  try {
    setReqHeaders() // SET TOKEN

    const res = fake_api_active
      ? await axios_get('/auth/login', user)
      : await axos.post(`/auth/login`, user)

    console.log(res) // res.data => {success: true, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."}

    if (res.data.success) {
      // setAuthToken( res.data.token )
      // const userData = await axos.get( `${ process.env.REACT_APP_API_URL }/api/v1/auth/me` )
      // console.log( userData )
      Cookies.set('rodmptoken', res.data.token, { expires: 7 }) // * Save cookie to browser

      // loadUser()
      dispatch({
        type: 'SET_USER',
        payload: res.data.user,
      })
    }

    return true
  } catch (error) {
    console.log(error)
    // setUserLoading( false )
    return false
  }
}

export const loadUser = async (token) => {
  setReqHeaders()

  // setUserLoading
  // dispatch( { type: 'SET_USER_LOADING' } )

  try {
    // const result = await axos.get( `/auth/me` )
    const res = fake_api_active
      ? await axios_get('/auth/me', token)
      : await axos.get(`/auth/me`)

    console.log(res)

    dispatch({
      type: 'SET_USER',
      payload: res.data.user,
    })

    // * Load current logged in user projects
    // getMyProjects()
  } catch (error) {
    console.log(error)
  }
}

// Logout
export const logout = () => {
  // First Clear Projects
  // localStorage.removeItem( 'token' )
  Cookies.remove('rodmptoken')
  dispatch({
    type: 'CLEAR_PROJECTS',
    payload: [],
  })
  // Then clear user token from localStorage and logout
  dispatch({ type: 'LOGOUT' })
}

// Clear Errors
export const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' })

export const loginn = async (userId) => {
  try {
    const res = await fetch(`/users?q=${userId}`, {
      method: 'GET',
    })

    const data = await res.json()

    console.log(data)

    localStorage.setItem('token', data[0]._id)

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: data[0],
    })

    loadUser()
  } catch (err) {
    console.log(err)
  }
}

export const setReqHeaders = () => {
  const token = Cookies.get('rodmptoken')
  if (token) {
    // Apply to every request
    // axos.defaults.headers.common[ 'Authorization' ] = token
    axos.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    // Delete auth header
    delete axos.defaults.headers.common['Authorization']
  }
}

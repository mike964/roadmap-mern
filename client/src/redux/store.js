/* eslint-disable no-undef */
import { createStore, combineReducers } from 'redux'
import authReducer from './reducers/auth.reducer';
import globalReducer from './reducers/global.reducer';
import projectReducer from './reducers/project.reducer';
import stepsReducer from './reducers/step.reducer';


const rootReducer = combineReducers( {
  auth: authReducer,
  project: projectReducer,
  step: stepsReducer,
  global: globalReducer
  // projectList 
  // projectPage
} )

const initialState = {}
// console.log( process.env.NODE_ENV )   // development 

// * In order to not show redux dev tools when production
const store = ( process.env.NODE_ENV === 'development'
  ? createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : createStore(
    rootReducer,
    initialState
  ) )

export default store


// why combineReducers doesn't work ?

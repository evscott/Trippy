import fetch from 'cross-fetch';
import { hostUrl } from '../../shared/Config';
import { getTransFromDb } from './tranActions';
import { getPlansFromDb } from './planActions';
import { getAccomsFromDb } from './accomActions';
import { getTripsFromDb } from './tripActions';
import { getUserInfoFromDb } from './userActions';

export const SIGNUP_REQUEST = 'REQUEST_SIGNUP';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function signupFailure() {
  return {
    type: SIGNUP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false
  };
}

function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
    lastUpdated: Date.now(),
    isAuthenticated: true,
    isFetching: true
  };
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    lastUpdated: Date.now(),
    isAuthenticated: true,
    isFetching: true
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    lastUpdated: Date.now()
  };
}

function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    lastUpdated: Date.now()
  };
}

/**
 * This action has effects in multiple reducers. Since logout will
 * affect every branch of the store by removing all of the information,
 * it requires extra information to update those areas of the program.
 * These extra pieces of information include empty arrays for the user,
 * accoms, plans, trans, and trips (as well as fetching/synced booleans).
 */
// exported to allow testing
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    lastUpdated: Date.now(),
    isAuthenticated: false,
    isFetching: false,
    isSynced: false,
    user: [],
    accoms: [],
    plans: [],
    trans: [],
    trips: []
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http POST signup request to server.
 * Dispatches requestSignup to indicate the beginning of a signup process.
 * Dispatches signupFailure to indicate the end of a failed signup process.
 * Dispatches signupSuccess to indicate the end of a successful signup process.
 * If signup process succeeds, a json web token is received and stored into
 * users local storage and getUserInfoFromDb is dispatched.
 * @param user object containing email, password, f_name, l_name.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function signup(user) {
  return (dispatch) => {
    dispatch(requestSignup(user)); // Signup request process has begun...
    return fetch(hostUrl + '/signup', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(signupFailure());
        else {
          localStorage.setItem('token', json.token);
          dispatch(signupSuccess());
          dispatch(getUserInfoFromDb());
        }
      });
  };
}

/**
 * Performs an http POST login request to server.
 * Dispatches requestLogin to indicate the beginning of a login process.
 * Dispatches loginFailure to indicate the end of a failed login process.
 * Dispatches loginSuccess to indicate the end of a successful login process.
 * If login process succeeds, a json web token is received and stored into
 * users local storage and getUserInfoFromDb is dispatched.
 * @param user object containing email, password.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function login(user) {
  return (dispatch) => {
    dispatch(requestLogin(user)); // login request process has begun...
    return fetch(hostUrl + '/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(loginFailure());
        else {
          localStorage.setItem('token', json.token);
          dispatch(loginSuccess());
          dispatch(getUserInfoFromDb());
          dispatch(getPlansFromDb());
          dispatch(getTransFromDb());
          dispatch(getAccomsFromDb());
          dispatch(getTripsFromDb());
        }
      });
  };
}

/**
 * Performs a "logout" operation by removing json web token from local storage
 * if one exists.
 * Dispatches requestLogout to indicate beginning of logout process.
 * Dispatches logoutFailure to indicate the end of a failed logout process.
 * Dispatches logoutSuccess to indicate the end of a successful logout process.
 * @returns {Function} dispatch results.
 */
export function logout() {
  return (dispatch) => {
    dispatch(requestLogout());
    let token = localStorage.getItem('token');
    if (!token) {
      dispatch(logoutFailure());
    } else {
      localStorage.removeItem('token');
      dispatch(logoutSuccess());
    }
  };
}

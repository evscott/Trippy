import { combineReducers } from 'redux';
import { authReducer } from './authReducers';
import { tripReducer } from './tripReducers';
import * as TripActions from '../actions/tripActions';
import * as AuthActions from '../actions/authActions';

const initialState = {
  user: {},
  trips: {}
};

export function masterReducer(state = initialState, action) {
  switch (action.type) {
    case TripActions.GET_TRIPS_REQUEST:
    case TripActions.GET_TRIPS_FAILURE:
    case TripActions.GET_TRIPS_SUCCESS:
    case TripActions.ADD_TRIP_REQUEST:
    case TripActions.ADD_TRIP_FAILURE:
    case TripActions.ADD_TRIP_SUCCESS:
    case TripActions.UPDATE_TRIP_REQUEST:
    case TripActions.UPDATE_TRIP_FAILURE:
    case TripActions.UPDATE_TRIP_SUCCESS:
    case TripActions.DELETE_TRIP_REQUEST:
    case TripActions.DELETE_TRIP_FAILURE:
    case TripActions.DELETE_TRIP_SUCCESS:
      return {
        ...state,
        trips: tripReducer(state.trips, action)
      };
    case AuthActions.SIGNUP_REQUEST:
    case AuthActions.SIGNUP_FAILURE:
    case AuthActions.SIGNUP_SUCCESS:
    case AuthActions.LOGIN_REQUEST:
    case AuthActions.LOGIN_FAILURE:
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.LOGOUT_REQUEST:
    case AuthActions.LOGOUT_FAILURE:
    case AuthActions.LOGOUT_SUCCESS:
    case AuthActions.GET_USER_INFO_REQUEST:
    case AuthActions.GET_USER_INFO_FAILURE:
    case AuthActions.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: authReducer(state.user, action)
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  masterReducer
});

export default rootReducer;
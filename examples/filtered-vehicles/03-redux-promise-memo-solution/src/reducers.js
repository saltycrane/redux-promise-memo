import { combineReducers } from "redux";
import {
  createMemoReducer,
  reduxPromiseMiddlewareConfig,
} from "redux-promise-memo";

const isLoading = (state = false, action) => {
  switch (action.type) {
    case "FETCH_VEHICLE_PENDING":
    case "FETCH_VEHICLES_PENDING":
      return true;
    case "FETCH_VEHICLE_FULFILLED":
    case "FETCH_VEHICLES_FULFILLED":
      return false;
    default:
      return state;
  }
};

const models = (state = [], action) => {
  switch (action.type) {
    case "FETCH_MODELS_FULFILLED":
      return action.payload;
    default:
      return state;
  }
};

const vehicle = (state = [], action) => {
  switch (action.type) {
    case "FETCH_VEHICLE_FULFILLED":
      return action.payload;
    default:
      return state;
  }
};

const vehicles = (state = [], action) => {
  switch (action.type) {
    case "FETCH_VEHICLES_FULFILLED":
      return action.payload;
    default:
      return state;
  }
};

const _memo = createMemoReducer(reduxPromiseMiddlewareConfig);

const rootReducer = combineReducers({
  _memo,
  isLoading,
  models,
  vehicle,
  vehicles,
});

export default rootReducer;

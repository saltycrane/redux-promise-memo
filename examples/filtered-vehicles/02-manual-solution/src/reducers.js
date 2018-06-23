import { combineReducers } from "redux";

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

const modelsCacheParams = (state = null, action) => {
  switch (action.type) {
    case "FETCH_MODELS_PENDING":
      return action.meta.params;
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

const vehicleCacheParams = (state = null, action) => {
  switch (action.type) {
    case "FETCH_VEHICLE_PENDING":
      return action.meta.vehicleId;
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

const vehiclesCacheParams = (state = null, action) => {
  switch (action.type) {
    case "FETCH_VEHICLES_FULFILLED":
      return action.meta.params;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  isLoading,
  models,
  modelsCacheParams,
  vehicle,
  vehicleCacheParams,
  vehicles,
  vehiclesCacheParams,
});

export default rootReducer;

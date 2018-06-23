import {
  fakeModelsApi,
  fakeVehicleApi,
  fakeVehiclesApi,
} from "fake-vehicle-apis";
import { memoize } from "redux-promise-memo";

const _fetchModels = make => ({
  type: "FETCH_MODELS",
  payload: fakeModelsApi(make),
});
export const memoizedFetchModels = memoize(_fetchModels, "FETCH_MODELS");

const _fetchVehicle = vehicleId => ({
  type: "FETCH_VEHICLE",
  payload: fakeVehicleApi(vehicleId),
});
export const memoizedFetchVehicle = memoize(_fetchVehicle, "FETCH_VEHICLE");

const _fetchVehicles = params => ({
  type: "FETCH_VEHICLES",
  payload: fakeVehiclesApi(params),
});
export const memoizedFetchVehicles = memoize(_fetchVehicles, "FETCH_VEHICLES");

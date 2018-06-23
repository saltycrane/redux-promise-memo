import {
  fakeModelsApi,
  fakeVehicleApi,
  fakeVehiclesApi,
} from "fake-vehicle-apis";

export const fetchModels = make => ({
  type: "FETCH_MODELS",
  payload: fakeModelsApi(make),
});

export const fetchVehicle = vehicleId => ({
  type: "FETCH_VEHICLE",
  payload: fakeVehicleApi(vehicleId),
});

export const fetchVehicles = params => ({
  type: "FETCH_VEHICLES",
  payload: fakeVehiclesApi(params),
});

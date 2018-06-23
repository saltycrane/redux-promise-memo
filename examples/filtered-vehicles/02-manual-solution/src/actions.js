import {
  fakeModelsApi,
  fakeVehicleApi,
  fakeVehiclesApi,
} from "fake-vehicle-apis";

export const fetchModels = make => ({
  type: "FETCH_MODELS",
  payload: fakeModelsApi(make),
  meta: { params: { make } },
});

export const fetchVehicle = vehicleId => ({
  type: "FETCH_VEHICLE",
  payload: fakeVehicleApi(vehicleId),
  meta: { vehicleId },
});

export const fetchVehicles = params => ({
  type: "FETCH_VEHICLES",
  payload: fakeVehiclesApi(params),
  meta: { params },
});

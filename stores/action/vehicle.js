import axios from "utilities/axiosClient";

export const getLocation = () => ({
  type: "GET_LOCATION",
  payload: axios.get(`/api/location`),
});
export const getAllVehicle = (id) => ({
  type: "GET_ALL_VEHICLE",
  payload: axios.get(
    `/api/vehicle?page=1&limit=20&orderBy=rentCount&orderType=asc`
  ),
});
export const getVehicleById = (id) => ({
  type: "GET_VEHICLE_BY_ID",
  payload: axios.get(`/api/vehicle/${id}`),
});
export const addVehicle = (data) => ({
  type: "ADD_ITEM",
  payload: axios.post(`/api/vehicle/`, data),
});

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

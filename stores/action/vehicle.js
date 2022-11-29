import axios from "utilities/axiosClient";
import swal from "sweetalert";

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
export const addVehicle = (data, push) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("locationId", data.locationId);
    formData.append("typeId", data.typeId);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("status", data.status);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("image1", data.image1);
    formData.append("image2", data.image2);
    formData.append("image3", data.image3);

    await axios.post(`api/vehicle/`, formData);
    push("/vehicles");
  } catch (err) {
    if (err.response.data.error.error.length < 1) {
      swal("Error", err.response.data.error.message, "error");
    } else {
      swal("Error", err.response.data.error.error[0].msg, "error");
    }
  }
};

import axios from "utilities/axiosClient";

export const getDataUserById = (id) => {
  return {
    type: "GET_DATA_USER_BY_ID",
    payload: axios.get(`/api/auth/user/${id}`),
  };
};

export const getDataUser = (page, limit, typeJob, skills, sortSkill) => {
  return {
    type: "GET_DATA_USER",
    payload: axios.get(`user/alldata`),
  };
};

export const updateDataUser = (userId, data) => {
  return {
    type: "UPDATE_DATA_USER",
    payload: axios.patch(`/api/auth/updateprofile/${userId}`, data),
  };
};

export const updateUserImage = (userId, data) => {
  return {
    type: "UPDATE_IMAGE_USER",
    payload: axios.patch(`/api/auth/image/${userId}`, data),
  };
};

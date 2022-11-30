const initialState = {
  popularData: [],
  location: [],
  dataVehicle: [],
  isError: false,
  isLoading: true,
  message: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATION_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case "GET_LOCATION_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        location: action.payload.data.data,
        message: action.payload.data.msg,
      };

    case "GET_LOCATION_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        location: [],
        message: action.payload.response.data,
      };

    case "GET_ALL_VEHICLE_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case "GET_ALL_VEHICLE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        popularData: action.payload.data.data,
        message: action.payload.data.msg,
      };

    case "GET_ALL_VEHICLE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        popularData: [],
        message: action.payload.response.data,
      };
    case "GET_VEHICLE_BY_ID_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case "GET_VEHICLE_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataVehicle: action.payload.data.data,
        message: action.payload.data.msg,
      };

    case "GET_VEHICLE_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataVehicle: [],
        message: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default auth;

const initialState = {
  data: {},
  allData: {},
  pageInfo: {},
  isLoading: false,
  isError: false,
  message: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_PENDING":
      return {
        ...state,
        allData: {},
        isLoading: true,
        isError: false,
        message: "",
      };

    case "GET_DATA_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        allData: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        message: action.payload.data.message,
      };

    case "GET_DATA_USER_REJECTED":
      return {
        ...state,
        allData: {},
        pageInfo: {},
        isLoading: false,
        isError: true,
        message: action.payload.response.data,
      };

    case "GET_DATA_USER_BY_ID_PENDING":
      return {
        ...state,
        data: {},
        isLoading: true,
        isError: false,
        message: "",
      };

    case "GET_DATA_USER_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        message: action.payload.data.msg,
      };

    case "GET_DATA_USER_BY_ID_REJECTED":
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: true,
      };

    case "UPDATE_DATA_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };

    case "UPDATE_DATA_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };

    case "UPDATE_DATA_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };

    case "UPDATE_IMAGE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };

    case "UPDATE_IMAGE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };

    case "UPDATE_IMAGE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.response.data.message,
      };
    default: {
      return state;
    }
  }
};

export default user;

import { combineReducers } from "redux";

import auth from "./auth";
import vehicle from "./vehicle";

export default combineReducers({
  auth,
  vehicle,
});

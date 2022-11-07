import { combineReducers } from "redux";

import auth from "./auth";
import vehicle from "./vehicle";
import user from "./user";

export default combineReducers({
  auth,
  vehicle,
  user,
});

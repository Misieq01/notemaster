import { combineReducers } from "redux";
import servData from "./server_data";
import editing from "./editing";
import notes from "./notes";
import labels from "./labels";

export default combineReducers({
  servData,
  editing,
  notes,
  labels
});

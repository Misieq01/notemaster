import { combineReducers } from "redux";
import editing from "./editing";
import notes from "./notes";
import labels from "./labels";

export default combineReducers({
  editing,
  notes,
  labels
});

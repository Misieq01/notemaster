import { combineReducers } from "redux";
import servData from "./server_data";
import editNote from "./edit_note";
import coreData from "./core_data";

export default combineReducers({
  servData,
  editNote,
  coreData
});

import * as type from "../Actions/ActionType";

const initialState = {
  notes: [],
  labels: [],
  fName: "",
  lName: ""
};

const server_data = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_SERVER_DATA:
      return action.data;
    case type.SAVE_DATA_TO_SERVER:
      return { ...state, notes: action.notes, labels: action.labels };
    default:
      return state;
  }
};

export const SaveData = state => state;
export default server_data;

import * as type from "../Actions/ActionType";

const initialState = {
  notes: [],
  labels: [],
  fName: "",
  lName: "",
  dataChange: true
};

const server_data = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_SERVER_DATA:
      return { ...action.data, dataChange: true };
    case type.SAVE_DATA_TO_SERVER:
      return {
        ...state,
        notes: action.notes,
        labels: action.labels,
        dataChange: !state.dataChange
      };
    default:
      return state;
  }
};

export const SaveData = state => state;
export default server_data;

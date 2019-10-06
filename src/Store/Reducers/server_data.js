import * as type from "../Actions/ActionType";

const initialState = {
  notes: [],
  labels: [],
  fName: "",
  lName: "",
  email: "",
  dataChange: false
};

const server_data = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_SERVER_DATA:
      return { ...action.data, dataChange: false };
    case type.SAVE_DATA_TO_SERVER:
      return {
        ...state,
        dataChange: true
      };
    case type.DATA_IS_SAVED:
      return {
        ...state,
        dataChange: false
      };
    default:
      return state;
  }
};

export default server_data;

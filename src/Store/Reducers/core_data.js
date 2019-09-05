import * as type from "../Actions/ActionType";

const initialState = {
  notes: [],
  labels: [],
  id: 0
};

let newState;

const core_data = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_DATA_TO_APP:
      return { ...action.data, id: action.data.notes.length };
    case type.ADD_NOTE:
      newState = { ...state };
      newState.notes.push(action.data);
      return { ...newState, id: state.id + 1 };
    case type.UPDATE_NOTE:
      newState = { ...state };
      newState.notes[action.editId] = action.data;
      return { ...newState };
    default:
      return state;
  }
};

export default core_data;

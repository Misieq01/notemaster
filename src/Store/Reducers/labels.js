import * as type from "../Actions/ActionType";

const initialState = {
  labels: []
};

let newState;

const label_manager = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_LABELS:
      return { ...state, labels: action.data };
    ///////////////////////////////////////////////////////////
    case type.ADD_LABEL:
      newState = { ...state };
      newState.labels.push(action.label);
      return newState;
    ///////////////////////////////////////////////////////////
    case type.REMOVE_LABEL:
      newState = { ...state };
      let label = newState.labels.indexOf(action.label);
      newState.labels.splice(label, 1);
      return newState;
    ///////////////////////////////////////////////////////////
    case type.RENAME_LABEL:
      newState = { ...state };
      newState.labels[action.id] = action.label;
      return newState;
    ///////////////////////////////////////////////////////////
    default:
      return state;
  }
};
export default label_manager;

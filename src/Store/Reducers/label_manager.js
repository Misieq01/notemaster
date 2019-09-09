import * as type from "../Actions/ActionType";

const initialState = {
  display: false
};

const label_manager = (state = initialState, action) => {
  switch (action.type) {
    case type.OPEN_LABELS_MANAGER:
      return { ...state, display: action.display };
    default:
      return state;
  }
};
export default label_manager;

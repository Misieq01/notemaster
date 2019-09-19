import * as type from "../Actions/ActionType";

const initialState = {
  editMode: false,
  editId: null,
  editType: "",
  color: "",
  addLabels: []
};

const edit_note = (state = initialState, action) => {
  switch (action.type) {
    case type.CREATE_NOTE:
      return { ...state, editMode: true, editType: action.noteType };
    case type.CLOSE_EDIT_MODE:
      return {
        ...state,
        editId: null,
        editType: "",
        editMode: false,
        color: "#ffffff"
      };
    case type.EDIT_NOTE:
      return {
        ...state,
        editMode: true,
        editType: action.noteType,
        editId: action.editId,
        color: action.color
      };
    case type.CHANGE_COLOR:
      return { ...state, color: action.color };
    default:
      return state;
  }
};

export default edit_note;

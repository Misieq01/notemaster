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
    case type.DELETE_NOTE:
      newState = { ...state };
      newState.notes.splice(action.id, 1);
      return newState;
    case type.COPY_NOTE:
      newState = { ...state };
      newState.notes.push(state.notes[action.id]);
      return newState;
    case type.REFRESH_NOTES_ID:
      newState = { ...state };
      let newNote;
      for (let i = 0; i < newState.notes.length; i++) {
        newNote = { ...newState.notes[i] };
        newNote.id = i;
        newState.notes[i] = { ...newNote };
      }
      newState.id = newState.notes.length;
      return newState;

    case type.ADD_LABEL:
      newState = { ...state };
      newState.labels.push(action.label);
      return newState;
    case type.REMOVE_LABEL:
      newState = { ...state };
      let label = newState.labels.indexOf(action.label);
      newState.labels.splice(label, 1);
      return newState;
    case type.RENAME_LABEL:
      newState = { ...state };
      newState.labels[action.id] = action.label;
      return newState;
    default:
      return state;
  }
};

export default core_data;

import * as type from "../Actions/ActionType";

const initialState = {
  notes: [],
  id: 0,
  forceRefresh: false
};

let newState;

const RefresLabelsNames = (labels, oldLabel, newLabel) => {
  let newLabels = [...labels];
  newLabels[newLabels.indexOf(oldLabel)] = newLabel;
  return newLabels;
};
const DeleteLabelFromNotes = (labels, deletedLabel) => {
  let newLabels = [...labels];
  newLabels.splice(newLabels.indexOf(deletedLabel), 1);
  return newLabels;
};

const notes = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_NOTES_FROM_SERVER:
      return { notes: action.data, id: action.data.length };
    ///////////////////////////////////////////////////////////
    case type.ADD_NOTE:
      newState = { ...state };
      newState.notes.push({
        id: state.id,
        type: action.noteType,
        title: "",
        content: "",
        color: "#ffffff",
        labels: []
      });
      return { ...newState, id: state.id + 1 };
    ///////////////////////////////////////////////////////////
    case type.UPDATE_NOTE:
      newState = { ...state };
      newState.notes[action.editId] = action.data;
      return { ...newState };
    ///////////////////////////////////////////////////////////
    case type.DELETE_NOTE:
      newState = { ...state };
      newState.notes.splice(action.id, 1);
      return newState;
    ///////////////////////////////////////////////////////////
    case type.COPY_NOTE:
      newState = { ...state };
      newState.notes.push(state.notes[action.id]);
      return newState;
    ///////////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////////
    case type.ADD_LABELS_TO_NOTE:
      newState = { ...state, forceRefresh: !state.forceRefresh };
      newState.notes[action.id].labels = action.labels;
      return newState;
    ///////////////////////////////////////////////////////////
    case type.REFRESH_NOTES_LABELS_NAMES:
      newState = { ...state, forceRefresh: !state.forceRefresh };
      for (let i = 0; i < newState.notes.length; i++) {
        newState.notes[i].labels = RefresLabelsNames(
          newState.notes[i].labels,
          action.oldLabel,
          action.newLabel
        );
      }

      return newState;
    case type.DELETE_LABEL_FROM_NOTES:
      newState = { ...state, forceRefresh: !state.forceRefresh };
      for (let i = 0; i < newState.notes.length; i++) {
        newState.notes[i].labels = DeleteLabelFromNotes(
          newState.notes[i].labels,
          action.label
        );
      }
      return newState;
    default:
      return state;
  }
};

export default notes;

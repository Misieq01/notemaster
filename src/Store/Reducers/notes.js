import * as type from "../Actions/ActionType";

const initialState = {
  notes: [],
  id: 0,
  forceRefresh: false,
  isNew: false
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
    case type.LOAD_NOTES:
      return { notes: action.data, id: action.data.length };
    ///////////////////////////////////////////////////////////
    case type.ADD_NOTE:
      newState = { ...state };
      let content;
      if (action.noteType === "note") {
        content = "";
      } else if (action.noteType === "list") {
        content = [{ id: 0, name: "", childs: [] }];
      }
      newState.notes.push({
        id: state.id,
        type: action.noteType,
        title: "",
        content: content,
        color: "#fff269",
        labels: []
      });
      return { ...newState, id: state.id + 1, isNew: true };
    ///////////////////////////////////////////////////////////
    case type.CANCEL_ADDING_NEW_NOTE:
      newState = { ...state };
      if (state.isNew === true) {
        newState.notes.pop();
        return { ...newState, isNew: false };
      } else {
        return state;
      }
    ///////////////////////////////////////////////////////////
    case type.UPDATE_NOTE:
      newState = { ...state };
      newState.notes[action.editId] = action.data;
      return { ...newState, isNew: false };
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
    case type.CHANGE_NOTE_LABELS:
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
    ///////////////////////////////////////////////////////////
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

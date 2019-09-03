const initialState = {
  editMode: false,
  editType: "",
  notes: [],
  id: 0,
  editId: 'none',
  noteColor: 'white',
  displayLabelManager: false,
  labels: [],
};

let newState;

const ExistingCheck = (id, state) => {
  for (let i = 0; i < state.notes.length; i++) {
    if (state.notes[i].id === id) {
      return true;
    }
  }
  return false;
};

const IdRefresh = state =>{
  let data = state.notes
  let newNote;
  for(let i = 0;i<state.notes.length; i++){
    newNote = {...data[i]};
    newNote.id = i;
    data[i] = newNote;
  }
  return {...state,notes:data}
}

const reducer = (state = initialState, action) => {
  if (action === "" || action === undefined) {
    return state;
  }

  switch (action.type) {
    case "EDIT_MODE_CHANGER":
      return { ...state, editMode: action.editMode, editType: action.editType, editId: action.editId,noteColor:''};
    case "ADD_NOTE_DATA":
      if (state.notes.length === 0 || !ExistingCheck(action.data.id, state)) {
        newState = { ...state };
        newState.notes.push(action.data);
        newState.id++;
        return newState;
      } else if (ExistingCheck(action.data.id, state)) {
        for (let i = 0; i < state.notes.length; i++) {
          if (state.notes[i].id === action.data.id) {
            newState = { ...state };
            newState.notes[i] = action.data;
            return newState;
          }
        }
      }
      break;
      case 'LOAD_DATA':
        let data= action.data.noteData;
        return{...state,id:data.id,labels:data.labels,notes:data.notes}
      case 'DELETE_NOTE_DATA':
        newState = {...state};
        newState.notes.splice(state.editId,1);
        return newState
      case "ID_REFRESH":
       newState={...state,id:state.notes.length} 
      newState = IdRefresh(newState);
      return newState
      case 'COPY_NOTE':
        newState ={...state};
        newState.notes.push(newState.notes[state.editId]);
        return newState;
        case'CHANGE_NOTE_COLOR':
        return{...state,noteColor:action.color}
        case 'SHOW/HIDE_LABEL_MANAGER':
          return{...state,displayLabelManager:action.display}
          case 'ADD_LABEL':
            newState = {...state}
            newState.labels.push(action.name)
            return newState
    default:
      return state;
  }
};

export default reducer;

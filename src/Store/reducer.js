const initialState = {
  editMode: false,
  editType: "",
  notes: [],
  id: 0,
  editId: 'none',
};

let newState;

const ExistingCheck = (id, state) => {
  for (let i = 0; i < state.notes.length; i++) {
    console.log(i)
    if (state.notes[i].id === id) {
      console.log('match')
      return true;
    }
  }
  return false;
};

const reducer = (state = initialState, action) => {
  if (action === "" || action === undefined) {
    return state;
  }

  switch (action.type) {
    case "EDIT_MODE_CHANGER":
      return { ...state, editMode: action.editMode, editType: action.editType, editId: action.editId };
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
      if(localStorage.getItem('data') === null){
        return state;
      }else{
        newState={...JSON.parse(localStorage.getItem('data'))}
        return newState;
      }
    default:
      return state;
  }
};

export default reducer;

import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../../Store/Actions/ActionType";

import ColorPicker from "./ColorPicker";
import AddLabel from "./AddLabel";

const Container = styled.div`
  height: 100vh;
  width: 12vw;
  background: #eeeeee;
  position: fixed;
  right: 0;
  top: 0;
  margin: auto;
  z-index: 1000;
  border-left: 2px solid rgba(21, 21, 21, 0.14);
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 3%;
  background: #eeeeee;
  border-left: 2px solid #4a89ff;
  position: fixed;
  right: 0;
  top: 0;
  margin: auto;
`;

const Button = styled.div`
  background: ${props => props.background || "inherit"}
  color: ${props => props.fontColor || "black"}
  width: 100%;
  height: 60px;
  font-size: 25px;
  padding 10px;
  opacity: 0.6;
  text-align: center;
  line-height: 60px;
  border-bottom: 2px solid rgba(21, 21, 21, 0.05);
  cursor:pointer;
  transition: all 0.2s ease-in-out;
  :hover{
    border-bottom: 2px solid rgba(21, 21, 21, 0.30);
    opacity: 1;
  }
`;

const EditPanel = props => {
  const [colorPickerDisplay, setColorPickerDisplay] = useState({
    bool: false,
    text: "Change Color"
  });
  const [addLabelDisplay, setAddLabelDisplay] = useState(false);

  const ColorPickerDisplay = () => {
    if (colorPickerDisplay.bool) {
      return <ColorPicker Close={ColorPickerSetter} />;
    } else {
      return null;
    }
  };
  const ColorPickerSetter = () => {
    console.log("fired");
    if (colorPickerDisplay.bool) {
      setColorPickerDisplay({ bool: false, text: "Change Color" });
    } else {
      setColorPickerDisplay({ bool: true, text: "Close" });
    }
  };
  const ColorPickerEl = ColorPickerDisplay();

  const DeleteHandler = () => {
    props.DeleteNote(props.editId);
    props.RefreshNotesId();
    props.CloseEditor();
  };

  const CopyHandler = () => {
    props.CopyNote(props.editId);
    props.RefreshNotesId();
    props.CloseEditor();
  };

  const CancelHandler = () => {
    props.CloseEditor();
    props.CancelAddingNewNote();
    props.RefreshNotesId();
  };

  return (
    <div>
      <Wrapper />
      <Container>
        <Button onClick={DeleteHandler}>Delete</Button>
        <Button onClick={CopyHandler}>Copy</Button>
        <Button onClick={ColorPickerSetter}>{colorPickerDisplay.text}</Button>
        {ColorPickerEl}
        <Button onClick={() => setAddLabelDisplay(true)}>Add Label</Button>
        {addLabelDisplay ? (
          <AddLabel Close={() => setAddLabelDisplay(false)} />
        ) : null}
        <Button onClick={CancelHandler}>Cancel Editing</Button>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    editId: state.editing.editId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    CloseEditor: () => dispatch({ type: action.CLOSE_EDIT_MODE }),
    DeleteNote: id => dispatch({ type: action.DELETE_NOTE, id: id }),
    CopyNote: id => dispatch({ type: action.COPY_NOTE, id: id }),
    RefreshNotesId: () => dispatch({ type: action.REFRESH_NOTES_ID }),
    CancelAddingNewNote: () => dispatch({ type: action.CANCEL_ADDING_NEW_NOTE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel);

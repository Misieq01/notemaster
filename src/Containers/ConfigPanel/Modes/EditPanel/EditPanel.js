import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../../Store/Actions/ActionType";

import ColorPicker from "./ColorPicker";
import AddLabel from "./AddLabel";

import { ReactComponent as DeleteIcon } from "../../../../SVGS/EditPanel/delete.svg";
import { ReactComponent as CopyIcon } from "../../../../SVGS/EditPanel/copy.svg";
import { ReactComponent as ColorIcon } from "../../../../SVGS/EditPanel/color.svg";
import { ReactComponent as LabelIcon } from "../../../../SVGS/EditPanel/label.svg";
import { ReactComponent as CancelIcon } from "../../../../SVGS/EditPanel/cancel.svg";

const Container = styled.div`
  height: 75px;
  width: 20vw;
  background: ${props => props.background};
  position: fixed;
  right: 0;
  top: 0;
  left:0;
  margin: auto;
  z-index: 1000;
  border-radius: 0 0 50px 50px
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
  display: inline-block;
  margin-bottom: 25px;
  opacity: 0.75;
`;

const EditPanel = props => {
  const [colorPickerDisplay, setColorPickerDisplay] = useState(false);
  const [addLabelDisplay, setAddLabelDisplay] = useState(false);

  const ColorPickerDisplay = () => {
    if (colorPickerDisplay) {
      return <ColorPicker Close={() => setColorPickerDisplay(false)} />;
    } else {
      return null;
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
      <Container background={props.color}>
        <Icon>
          <DeleteIcon onClick={DeleteHandler} title="Delete Note" />
        </Icon>
        <Icon>
          <CopyIcon onClick={CopyHandler} title="Copy Note" />
        </Icon>
        <Icon>
          <ColorIcon
            onClick={() => setColorPickerDisplay(true)}
            title="Change Color"
          />
        </Icon>
        {ColorPickerEl}
        <Icon>
          <LabelIcon
            onClick={() => setAddLabelDisplay(true)}
            title="Change Labels"
          />
        </Icon>
        {addLabelDisplay ? (
          <AddLabel Close={() => setAddLabelDisplay(false)} />
        ) : null}
        <Icon>
          <CancelIcon onClick={CancelHandler} title="Cancel" />
        </Icon>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    editId: state.editing.editId,
    color: state.editing.color
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

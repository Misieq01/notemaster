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

const EditPanel = ({
  color,
  id,
  CloseEditor,
  RefreshNotesId,
  CancelAddingNewNote,
  CopyNote,
  DeleteNote
}) => {
  const [colorDisplay, setColorDisplay] = useState(false);
  const [labelDisplay, setLabelDisplay] = useState(false);

  const DeleteHandler = () => {
    DeleteNote(id);
    RefreshNotesId();
    CloseEditor();
  };

  const CopyHandler = () => {
    CopyNote(id);
    RefreshNotesId();
    CloseEditor();
  };

  const CancelHandler = () => {
    CloseEditor();
    CancelAddingNewNote();
    RefreshNotesId();
  };

  return (
    <div>
      <Container background={color}>
        <Icon>
          <DeleteIcon onClick={DeleteHandler} title="Delete Note" />
        </Icon>
        <Icon>
          <CopyIcon onClick={CopyHandler} title="Copy Note" />
        </Icon>
        <Icon>
          <ColorIcon
            onClick={() => setColorDisplay(true)}
            title="Change Color"
          />
        </Icon>
        {colorDisplay ? (
          <ColorPicker Close={() => setColorDisplay(false)} />
        ) : null}
        <Icon>
          <LabelIcon
            onClick={() => setLabelDisplay(true)}
            title="Change Labels"
          />
        </Icon>
        {labelDisplay ? (
          <AddLabel Close={() => setLabelDisplay(false)} />
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
    id: state.editing.editId,
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

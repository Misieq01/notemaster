import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import { ReactComponent as CancelIcon } from "../../SVGS/EditPanel/cancel.svg";

import EditPanel from "./EditPanel/EditPanel";
import NoteEditor from "./NoteEditor";
import ListEditor from "./ListEditor";
import Background from "../../Components/Background";
// 600px
const Container = styled.div`
  width: 100vw;
  min-height: 60px;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  background: ${props => props.background};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  @media (min-width: 640px) {
    width: 600px;
  }
  @media (min-height: 800px) {
    top: 100px;
  }
`;

const Title = styled.input`
  width: 92%;
  font-size: 30px;
  line-height: 30px;
  opacity: 0.8;
  padding: 4% 4% 2% 4%;
  border: none;
  outline: none;
  text-decoration: none;
  background: ${props => props.background || "#eeeeee"};
  border-radius: 8px 8px 0px 0px;
  box-shadow: ${props => props.boxShadow || null};
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  height: 15%;
  width: 37%;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  :hover {
    transform: scale(1.05);
  }
`;
const Label = styled.div`
  font-size: 15px;
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: default;
`;
const LabelsWrapper = styled.div`
  height: 20px;
  width: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 2%;
`;
const Icon = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  margin: auto;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
  opacity: 0.75;
`;

const Editor = ({
  type,
  color,
  id,
  notes,
  UpdateNote,
  CloseEditor,
  DeleteNote,
  CopyNote,
  CancelAddingNewNote,
  RefreshNotesId,
  DataChange
}) => {
  const [data, setData] = useState(notes[id]);
  const [TitleShadow, setTitleShadow] = useState(null);
  const NoteLabels = notes[id].labels;
  const editorRef = useRef();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const GetContent = content => {
    setData({ ...data, content: content });
  };

  const ChangeBoxShadow = top => {
    if (top === 0) {
      setTitleShadow(null);
    } else if (top > 0) {
      setTitleShadow("0 4px 5px -2px rgba(0, 0, 0, 0.5)");
    }
  };

  const WhichEditor = type => {
    switch (type) {
      case "note":
        return (
          <NoteEditor
            GetContent={GetContent}
            content={data.content}
            color={color}
            BoxShadow={ChangeBoxShadow}
          />
        );
      case "list":
        return (
          <ListEditor
            GetContent={GetContent}
            content={data.content}
            color={color}
            BoxShadow={ChangeBoxShadow}
          />
        );
      default:
        console.log("Nie określono typu notatki do edytowania");
        return null;
    }
  };

  const FinishEditingHandler = () => {
    UpdateNote({ ...data, color: color, labels: NoteLabels }, id);
    DataChange();
    CloseEditor();
  };

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

  const Editor = WhichEditor(type);
  const Labels = (
    <LabelsWrapper>
      {NoteLabels.map((label, index) => {
        return <Label key={index}>{label}</Label>;
      })}
    </LabelsWrapper>
  );

  return (
    <div>
      <Background onClick={CancelHandler} />
      <Container background={color} ref={editorRef}>
        <Title
          placeholder="Title"
          onChange={event => setData({ ...data, title: event.target.value })}
          value={data.title}
          background={color}
          boxShadow={TitleShadow}
        />
        {Editor}
        {Labels}
        <MenuWrapper>
          <EditPanel
            Delete={DeleteHandler}
            Copy={CopyHandler}
            editorRef={editorRef}
          />
          <CloseButton onClick={FinishEditingHandler}>Finish</CloseButton>
        </MenuWrapper>
        <Icon>
          <CancelIcon onClick={CancelHandler} title="Cancel" />
        </Icon>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    type: state.editing.editType,
    id: state.editing.editId,
    color: state.editing.color,
    notes: state.notes.notes,
    RefreshWhenNoteLabelChange: state.notes.forceRefresh
  };
};

const mapDispatchToProps = dispatch => {
  return {
    UpdateNote: (data, editId) =>
      dispatch({ type: action.UPDATE_NOTE, data: data, editId: editId }),
    CloseEditor: () => dispatch({ type: action.CLOSE_EDIT_MODE }),
    DeleteNote: id => dispatch({ type: action.DELETE_NOTE, id: id }),
    CopyNote: id => dispatch({ type: action.COPY_NOTE, id: id }),
    RefreshNotesId: () => dispatch({ type: action.REFRESH_NOTES_ID }),
    CancelAddingNewNote: () =>
      dispatch({ type: action.CANCEL_ADDING_NEW_NOTE }),
    DataChange: () => {
      dispatch({ type: action.DATA_CHANGE, change: true });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

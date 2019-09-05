import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import NoteEditor from "./NoteEditor";
import ListEditor from "./ListEditor";
import CodeSnippetEditor from "./CodeSnippetEditor";
import Background from "../../Components/Background";

const Container = styled.div`
  width: 35%;
  min-height: 60px;
  position: absolute;
  z-index: 1000;
  top: 100px;
  right: 0;
  left: 0;
  margin: auto;
  background: #eeeeee;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  height: 15%;
  width: 50%;
  margin: 1.5%;
  cursor: pointer;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  background: #5496ff;
  color: #eeeeee;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  font-size: 20px;
`;

const Editor = props => {
  const InitialData = () => {
    if (props.editId === null) {
      return {
        id: props.id,
        type: props.type,
        title: "",
        content: "",
        color: props.color
      };
    } else {
      return props.notes[props.editId];
    }
  };

  const [data, setData] = useState(InitialData());

  const GetInputValue = (event, type) => {
    setData({ ...data, [type]: event.target.value });
  };

  const WhichEditor = type => {
    switch (type) {
      case "note":
        return <NoteEditor getValue={GetInputValue} twoWayBinding={data} />;
      case "list":
        return <ListEditor getValue={GetInputValue} twoWayBinding={data} />;
      case "snippet":
        return (
          <CodeSnippetEditor getValue={GetInputValue} twoWayBinding={data} />
        );
      default:
        console.log("Nie określono typu notatki do edytowania");
        return null;
    }
  };

  let editor = WhichEditor(props.type);

  const FinishEditingHandler = () => {
    if (props.editId === null) {
      props.AddNote(data);
    } else if (props.editId !== null) {
      props.UpdateNote(data, props.editId);
    }
    props.CloseEditing();
  };

  console.log(data.id);

  return (
    <div>
      <Background />
      <Container>
        {editor}
        <CloseButton onClick={FinishEditingHandler}>Finish</CloseButton>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    type: state.editNote.editType,
    id: state.coreData.id,
    editId: state.editNote.editId,
    color: state.editNote.color,
    notes: state.coreData.notes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AddNote: data => dispatch({ type: action.ADD_NOTE, data: data }),
    UpdateNote: (data, editId) =>
      dispatch({ type: action.UPDATE_NOTE, data: data, editId: editId }),
    CloseEditing: () => dispatch({ type: action.CLOSE_EDIT_MODE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

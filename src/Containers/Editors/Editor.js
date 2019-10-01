import React, { useState, useEffect } from "react";
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
  background: ${props => props.background};
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
  const [data, setData] = useState(props.notes[props.editId]);

  const GetInputValue = (event, type) => {
    setData({ ...data, [type]: event.target.value });
  };
  const GetList = list => {
    setData({ ...data, content: list });
  };
  const WhichEditor = type => {
    switch (type) {
      case "note":
        return (
          <NoteEditor
            getValue={GetInputValue}
            twoWayBinding={data}
            color={props.color}
            labels={props.notes[props.editId].labels}
          />
        );
      case "list":
        return (
          <ListEditor
            GetValue={GetInputValue}
            GetList={GetList}
            data={data}
            color={props.color}
            labels={props.notes[props.editId].labels}
          />
        );
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
    props.UpdateNote(
      { ...data, color: props.color, labels: props.notes[props.editId].labels },
      props.editId
    );
    props.CloseEditing();
  };
  console.log(props.color);
  return (
    <div>
      <Background />
      <Container background={props.color}>
        {editor}
        <CloseButton onClick={FinishEditingHandler}>Finish</CloseButton>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    type: state.editing.editType,
    //id: state.notes.id,
    editId: state.editing.editId,
    color: state.editing.color,
    notes: state.notes.notes,
    RefreshWhenNoteLabelChange: state.notes.forceRefresh
  };
};

const mapDispatchToProps = dispatch => {
  return {
    UpdateNote: (data, editId) =>
      dispatch({ type: action.UPDATE_NOTE, data: data, editId: editId }),
    CloseEditing: () => dispatch({ type: action.CLOSE_EDIT_MODE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

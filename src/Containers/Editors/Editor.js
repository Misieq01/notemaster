import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import NoteEditor from "./NoteEditor";
import ListEditor from "./ListEditor";
import Background from "../../Components/Background";

const Container = styled.div`
  width: 35%;
  min-height: 60px;
  position: absolute;
  z-index: 1000;
  top: 200px;
  right: 0;
  left: 0;
  margin: auto;
  background: ${props => props.background};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.input`
  width: 92%;
  font-size: 30px;
  line-height: 30px;
  opacity: 0.8;
  padding: 4% 4% 0 4%;
  border: none;
  outline: none;
  text-decoration: none;
  background: ${props => props.background || "#eeeeee"};
  border-radius: 8px 8px 0px 0px;
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  height: 15%;
  width: 50%;
  margin: 1.5%;
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
  background: #eeeeee;
  cursor: default;
`;
const LabelsWrapper = styled.div`
  width: 92%;
  padding: 1%;
  height: 20px;
`;

const Editor = ({ type, color, id, notes, UpdateNote, CloseEditing }) => {
  const [data, setData] = useState(notes[id]);
  const NoteLabels = notes[id].labels;

  const GetContent = content => {
    setData({ ...data, content: content });
  };
  const WhichEditor = type => {
    switch (type) {
      case "note":
        return (
          <NoteEditor
            GetContent={GetContent}
            content={data.content}
            color={color}
          />
        );
      case "list":
        return (
          <ListEditor
            GetContent={GetContent}
            content={data.content}
            color={color}
          />
        );
      default:
        console.log("Nie określono typu notatki do edytowania");
        return null;
    }
  };

  const FinishEditingHandler = () => {
    UpdateNote({ ...data, color: color, labels: NoteLabels }, id);
    CloseEditing();
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
      <Background />
      <Container background={color}>
        <Title
          placeholder="Title"
          onChange={event => setData({ ...data, title: event.target.value })}
          value={data.title}
          background={color}
        />
        {Editor}
        {Labels}
        <CloseButton onClick={FinishEditingHandler}>Finish</CloseButton>
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
    CloseEditing: () => dispatch({ type: action.CLOSE_EDIT_MODE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

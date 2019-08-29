import React, { useState } from "react";
import styled from "styled-components";

import NoteEditor from "./NoteEditor";

import { connect } from "react-redux";

const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  z-index: 999;
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

const Container = styled.div`
  width: 35%;
  min-height: 60px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  background: ${props => props.background || "white"};
  border-radius: 8px;
  box-shadow: 0px 1px 5px #777777;
  text-align: center;
  z-index: 1000;
`;

const Editor = props => {

  let data = {};

  if (props.editId === "none") {
    switch (props.editType) {
      case "note":
        data = {
          id: props.id,
          title: "",
          text: "",
          type: 'note',
          color: 'white',
        };
        break;
        case 'list':
          break;

        case 'remainder':
          break;
      default:
        break;
    }
  }else if(props.editId !== 'none'){
    data = props.notes[props.editId]
  }

  const [noteData, setNoteData] = useState(data);

  if(props.color !== noteData.color && props.color!== ''){
    setNoteData({...noteData,color:props.color});
  }

  const GetInputData = (event, type) => {
    setNoteData({ ...noteData, [type]: event.target.value });
  };

  const CloseHandler = () => {
    props.AddNoteData(noteData);
    props.CloseEditMode();
  };
  return (
    <div>
      <Background />
      <Container background={noteData.color}>
        {props.editType === "note" ? (
          <NoteEditor GetInputData={GetInputData} twoWayBinding={noteData} color={noteData.color}/>
        ) : null}
        <CloseButton onClick={CloseHandler}>Finish</CloseButton>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    editType: state.editType,
    id: state.id,
    editId: state.editId,
    notes: state.notes,
    color: state.noteColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    CloseEditMode: () => {
      dispatch({
        type: "EDIT_MODE_CHANGER",
        editMode: false,
        editType: "",
        editId: "none"
      });
    },
    AddNoteData: data => {
      dispatch({ type: "ADD_NOTE_DATA", data: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

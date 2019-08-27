import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

const Container = styled.div`
  width: 310px;
  max-height: 450px;
  background: white;
  box-shadow: 0px 1px 5px grey;
  border-radius: 3px;
  margin: 15px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    background: #f0f0f0;
    transform: scale(1.1);
  }
  text-align: center;
`;
const Title = styled.h2`
    width:90%;
    height: 10%
    padding: 10px;
    margin:0;
`;
const Text = styled.p`
    width:90%
    hegiht: 70%
    padding: 5px;
    margin:0;
    text-align: justify;
    display:inline-block;
    font-size: 18px;
`;

const NoteCard = props => {

  const NoteTruncate = text => {
    if(text.length > 450){
    let newText = text.substring(0, 450);
    if (newText.lastIndexOf(" ") > 0) {
      newText = newText.substring(
        0,
        Math.min(newText.length, newText.lastIndexOf(" "))
      );
    }

    newText = newText.concat(" {...}");

    return newText;
    }
    return text
  };

  const text = NoteTruncate(props.text);

  return (
    <Container
      onClick={() => {
        props.OpenEditMode(props.id);
      }}
    >
      <Title>{props.title}</Title>
      <Text>{text}</Text>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    OpenEditMode: id =>
      dispatch({
        type: "EDIT_MODE_CHANGER",
        editMode: true,
        editType: "note",
        editId: id
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NoteCard);

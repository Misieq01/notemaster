import React from "react";
import styled from "styled-components";

import ResizableTextArea from "../../Components/ResizableTextArea";

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  background: ${props => props.background || 'white'};
  border-radius: 8px 8px 0px 0px;
  text-align: center;
`;

const TitleInput = styled.input`
  width: 96%;
  line-height: 35px;
  border-radius: 8px 8px 0px 0px;
  font-size: 30px;
  text-decoration: none;
  border: none;
  outline: none;
  padding: 2%;
  background: ${props => props.background || "white"};
  resize: none;
  overflow: hidden;
`;
const NoteArea = styled(ResizableTextArea)`
    width:96%
    min-height: 30px;
    padding: 2%;
    resize:none;
    border:none;
    text-decoration:none;
    outline:none;
    font-size: 23px;
    background: ${props => props.background || "white"};
    line-height: 30px;
}


`;

const NoteEditor = props => {
  return (
    <Container background={props.color}>
      <TitleInput
        background={props.color}
        placeholder="Title"
        minRows={1}
        maxRows={2}
        lineHeight={35}
        onChange={event => {
          props.GetInputData(event, "title");
        }}
        value={props.twoWayBinding.title}
      />
      <NoteArea
        background={props.color}
        placeholder="Write Your Thoughts"
        minRows={1}
        maxRows={20}
        lineHeight={30}
        GetInputData={props.GetInputData}
        value={props.twoWayBinding.text}
      />
    </Container>
  );
};

export default NoteEditor;

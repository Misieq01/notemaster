import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: blue;
  position: absolute;
  width: 300px;
  height: 200px;
  top: 40px;
  right: 80px;
  z-index: 500;
`;

const ChooseAddType = props => {
  const AddHandler = type => {
    props.close(false);
    props.createNote(type);
  };

  return (
    <Container>
      <button onClick={() => AddHandler("note")}>Add Note</button>
      <button onClick={() => AddHandler("list")}>Add List</button>
      <button onClick={() => AddHandler("snippet")}>Add Code Snippet</button>
      <button onClick={() => props.close(false)}>Close</button>
    </Container>
  );
};

export default ChooseAddType;

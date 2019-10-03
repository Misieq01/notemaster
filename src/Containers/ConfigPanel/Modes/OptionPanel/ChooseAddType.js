import React from "react";
import styled from "styled-components";

import { ReactComponent as NoteIcon } from "../../../../SVGS/ChooseAddType/note.svg";
import { ReactComponent as ListIcon } from "../../../../SVGS/ChooseAddType/list.svg";

const Container = styled.div`
  background: #eeeeee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  width: 200px;
  top: 20px;
  right: 60px;
  z-index: 500;
`;
const Button = styled.button`
  display: block;
  width: 155px;
  font-size: 20px;
  margin: 5px;
  padding: 5px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;
const Icon = styled.div`
  width: 20px;
  height: auto;
  display: inline-block;
  margin-left: 5px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.2s ease-in-out;
  :hover {
    background: #dddddd;
  }
`;

const ChooseAddType = props => {
  const AddHandler = type => {
    props.Close(false);
    props.CreateNote(type);
  };

  return (
    <Container>
      <Wrapper>
        <Icon>
          <NoteIcon />
        </Icon>
        <Button onClick={() => AddHandler("note")}>Add Note</Button>
      </Wrapper>
      <Wrapper>
        <Icon>
          <ListIcon />
        </Icon>
        <Button onClick={() => AddHandler("list")}>Add List</Button>
      </Wrapper>
    </Container>
  );
};

export default ChooseAddType;

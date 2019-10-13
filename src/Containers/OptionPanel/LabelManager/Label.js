import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as RenameIcon } from "../../../SVGS/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../../SVGS/x.svg";
import { ReactComponent as AcceptIcon } from "../../../SVGS/tick.svg";

const Container = styled.div`
  width: 90%;
  height: 30px;
  padding: 2% 2% 2% 5%;
  text-align: left;
  background: #eeeeee;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  :hover {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin: 0 3px;
  display: inline-block;
  :hover {
    transform: scale(1.2);
  }
`;

const Input = styled.input`
  background: #eeeeee;
  font-size: 19px;
  width: 100%;
`;
const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
`;

const Label = ({
  name,
  id,
  Rename,
  Remove,
  RefreshLabelNameInNotes,
  DeleteLabelFromNotes
}) => {
  const [newValue, setNewValue] = useState(name);
  const [edit, setEdit] = useState(false);

  const RenameHandler = () => {
    Rename(newValue, id);
    RefreshLabelNameInNotes(name, newValue);
    setEdit(false);
  };
  const RemoveHandler = () => {
    Remove(name);
    DeleteLabelFromNotes(name);
  };

  return (
    <Container>
      {edit ? (
        <>
          <Input
            value={newValue}
            onChange={event => setNewValue(event.target.value)}
            autoFocus={true}
          />
          <Icon>
            <AcceptIcon title="Confirm" onClick={RenameHandler} />
          </Icon>
        </>
      ) : (
        <>
          <Text title="Click to rename" onClick={() => setEdit(true)}>
            {newValue}
          </Text>
          <Icon>
            <DeleteIcon title="Delete" onClick={RemoveHandler} />
          </Icon>
        </>
      )}
    </Container>
  );
};

export default Label;

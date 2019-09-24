import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as RenameIcon } from "../../SVGS/rename.svg";
import { ReactComponent as DeleteIcon } from "../../SVGS/close.svg";
import { ReactComponent as AcceptIcon } from "../../SVGS/accept.svg";

const Container = styled.div`
  width: 40%;
  margin: 5px;
  font-size: 18px;
  padding: 5px;
  text-align: left;
  background: #eeeeee;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
  display: inline-block;
  margin: 0px 5px;
  float: right;
`;

const Label = props => {
  const [newValue, setNewValue] = useState(props.name);
  const [edit, setEdit] = useState(false);

  const RenameHandler = () => {
    props.Rename(newValue, props.id);
    props.RefreshLabelNameInNotes(props.name, newValue);
    setEdit(false);
  };

  return (
    <Container>
      {edit ? (
        <div>
          <input
            value={newValue}
            onChange={event => setNewValue(event.target.value)}
          />
          <Icon>
            <DeleteIcon title="Cancle" onClick={() => setEdit(false)} />
          </Icon>
          <Icon>
            <AcceptIcon title="Confirm" onClick={RenameHandler} />
          </Icon>
        </div>
      ) : (
        <div>
          {props.name}
          <Icon>
            <DeleteIcon
              title="Delete"
              onClick={() => props.Remove(props.name)}
            />
          </Icon>
          <Icon>
            <RenameIcon title="Rename" onClick={() => setEdit(true)} />
          </Icon>
        </div>
      )}
    </Container>
  );
};

export default Label;

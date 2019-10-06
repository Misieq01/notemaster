import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../../../SVGS/box.svg";
import { ReactComponent as TickedBoxIcon } from "../../../../SVGS/box-ticked.svg";

import * as action from "../../../../Store/Actions/ActionType";

import { connect } from "react-redux";

const Container = styled.div`
  position: absolute;
  top: 200px;
  right: -650px;
  margin: auto;
  width: 250px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 6px;
  background: ${props => props.background};
  text-align: center;
`;

const Button = styled.div`
  height: 15%;
  width: 50%;
  margin: 1.5%;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  display: inline-block;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  :hover {
    transform: scale(1.05);
  }
`;
const LabelTag = styled.div`
  background: none;
  width: 96%;
  height: 22px;
  display: flex;
  padding: 2%;
  align-items: center;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
`;
const LabelText = styled.p`
  margin: 0px 0px 0px 5px;
  font-size: 15px;
`;

const Icon = styled.div`
  width: 20px;
  height: auto;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const AddLabel = ({ labels, notes, id, color, Close, ChangeLabels }) => {
  /*
  SO THIS FUCKING FUNCTION BASICLY ADD 'isAdded' TO EACH LABEL, SO LABELS LOOKS LIKE THIS NOW:
  [
    {label: label1,isAdded: false}
    {label: label2,isAdded: false}
    {label: label3,isAdded: false}
  ]
  INSTEAD OF:
  [
    label1,label2,label3
  ]
  
  And this structure of data is keept only in this commponent
  When adding is finished it passing online labels names to store without 'isAdded'
  So here labels is an array of objects and in store labels is an array of strings
  
  I made this to dynamicly change style of added labels
  */
  const AdjustLabelsDataForDisplayPurpose = (oldLabels, noteLabels) => {
    // Restructure lables y adding isAdded to each
    const labels = [...oldLabels].map((label, i) => {
      if (noteLabels.includes(label)) {
        return { label: label, isAdded: true };
      } else return { label: label, isAdded: false };
    });
    return labels;
  };

  const [changedLabels, setLabels] = useState(
    AdjustLabelsDataForDisplayPurpose(labels, notes[id].labels)
  );

  console.log(changedLabels);

  const ChooseLabel = (i, isAdded, label) => {
    const newNoteLabels = [...notes[id].labels];
    const newLabels = [...changedLabels];
    if (isAdded) {
      newLabels[i].isAdded = false;
      newNoteLabels.splice(newNoteLabels.indexOf(label), 1);
      setLabels(newLabels);
      ChangeLabels(newNoteLabels, id);
    } else if (!isAdded) {
      newLabels[i].isAdded = true;
      newNoteLabels.push(newLabels[i].label);
      setLabels(newLabels);
      ChangeLabels(newNoteLabels, id);
    }
  };

  return (
    <Container background={color}>
      {changedLabels.map((label, index) => {
        return (
          <LabelTag
            key={index}
            id={index}
            onClick={() => ChooseLabel(index, label.isAdded, label.label)}
          >
            <Icon>{label.isAdded ? <TickedBoxIcon /> : <BoxIcon />}</Icon>
            <LabelText>{label.label}</LabelText>
          </LabelTag>
        );
      })}
      <Button onClick={Close}>Close</Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    labels: state.labels.labels,
    id: state.editing.editId,
    notes: state.notes.notes,
    color: state.editing.color
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ChangeLabels: (labels, id) =>
      dispatch({ type: action.CHANGE_NOTE_LABELS, id: id, labels: labels })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLabel);

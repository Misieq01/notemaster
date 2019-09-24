import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../../../SVGS/box.svg";
import { ReactComponent as TickedBoxIcon } from "../../../../SVGS/box-ticked.svg";

import * as action from "../../../../Store/Actions/ActionType";

import { connect } from "react-redux";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: auto;
  width: 21vw;
  height: 20vw;
  box-shadow: 0px 1p 5px #777777;
  border-radius: 6px;
  background: red;
  text-align: center;
`;

const Button = styled.div`
  display:inline-block;
  background: #5496ff;
  color: #eeeeee;
  width: 90%;
  font-size: 25px;
  padding 5px;
  text-align: center;
  cursor:pointer;
  transition: all 0.2s ease-in-out;
  border-radius:4px;
  :hover{
    transform: scale(1.05)
  }
`;
const LabelTag = styled.div`
  background: #eeeeee;
  padding: 5px;
  width: 80%;
  hegiht: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 5px;
  text-align: center;
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

const AddLabel = props => {
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
  const AdjustLabelsDataForDisplayPurpose = (labels, noteLabels) => {
    let newLabels = [...labels];
    let newNoteLabels = [...noteLabels];
    // Check is there any label to restructure
    if (newLabels.length > 0) {
      // Restructure labels data by adding isAdded boolean
      for (let i = 0; i < newLabels.length; i++) {
        newLabels[i] = { label: newLabels[i], isAdded: false };
      }
    }

    // Check is there any label which is added to note
    if (newNoteLabels.length > 0) {
      // Change 'isAdded' to true for added labels
      for (let i = 0; i < newNoteLabels.length; i++) {
        if (labels.indexOf(newNoteLabels[i]) !== -1) {
          newLabels[labels.indexOf(newNoteLabels[i])].isAdded = true;
        }
      }
    }

    return newLabels;
  };

  const [labels, setLabels] = useState(
    AdjustLabelsDataForDisplayPurpose(
      props.labels,
      props.notes[props.id].labels
    )
  );
  const [noteLabels, setNoteLabels] = useState(props.notes[props.id].labels);

  const ChooseLabel = (id, isAdded, label) => {
    let newNoteLabels = [...noteLabels];
    let newLabels = [...labels];
    if (isAdded) {
      newLabels[id].isAdded = false;
      newNoteLabels.splice(newNoteLabels.indexOf(label), 1);
      setLabels(newLabels);
      setNoteLabels(newNoteLabels);
    } else if (!isAdded) {
      newLabels[id].isAdded = true;
      newNoteLabels.push(newLabels[id].label);
      setLabels(newLabels);
      setNoteLabels(newNoteLabels);
    }
  };

  const AddLabelHandler = () => {
    props.AddLabels(noteLabels, props.id);
    props.Close();
  };

  return (
    <Container>
      <p>Choose labels to add</p>
      {labels.map((label, index) => {
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
      <Button onClick={AddLabelHandler}>Apply</Button>
      <Button onClick={props.Close}>Cancel</Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    labels: state.labels.labels,
    id: state.editing.editId,
    notes: state.notes.notes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AddLabels: (labels, id) =>
      dispatch({ type: action.ADD_LABELS_TO_NOTE, id: id, labels: labels })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLabel);

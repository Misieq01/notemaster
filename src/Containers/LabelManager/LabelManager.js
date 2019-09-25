import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import Background from "../../Components/Background";
import Label from "./Label";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 40%;
  height: 80%;
  box-shadow: 0px 1px 5px #444444;
  z-index: 200;
  background: #eeeeee;
  text-align: center;
`;
const SearchBar = styled.input`
  outline: none;
  border: none;
  width: 70%;
  font-size: 25px;
  padding: 5px;
  margin: 5px;
  display: inline-block;
`;
const AddButton = styled.button`
  border: none;
  outline: none;
  width: 20%;
  height: 40px;
  font-size: 20px;
  padding: 5px;
  maring: 5px;
  display: inline-block;
  cursor: pointer;
`;
const CloseButton = styled.button`
  height: 30px;
  width: 90%;
  cursor: pointer;
  border: 2px solid #5496ff;
  text-decoration: none;
  background: #5496ff;
  color: #eeeeee;
  transition: all 0.3s ease-in-out;
  :hover {
    background: #eeeeee;
    color: black;
  }
  font-size: 20px;
  margin-top: 10px;
`;
const LabelsContainer = styled.div`
  height: 80%;
  width: 90%;
  background: orange;
  display: inline-block;
`;

const LabelManager = props => {
  const [SearchValue, setSearchValue] = useState("");

  const AddLabelHandler = () => {
    let isExist = false;
    for (let i = 0; i < props.labels.length; i++) {
      if (props.labels[i] === SearchValue) {
        isExist = true;
      }
    }
    if (!isExist && SearchValue !== "") {
      props.AddLabel(SearchValue);
      setSearchValue("");
    } else {
      console.log("You cant add label beacause it already exists");
    }
  };

  return (
    <div>
      <Background />
      <Container>
        <SearchBar
          placeholder="Search or Add label that has max 10 signs"
          onChange={event => setSearchValue(event.target.value)}
          value={SearchValue}
          maxLength="22"
        />
        <AddButton onClick={AddLabelHandler}>Add Label</AddButton>
        <LabelsContainer>
          {props.labels.map((label, index) => {
            return (
              <Label
                key={index}
                id={index}
                name={label}
                Remove={props.RemoveLabel}
                Rename={props.ChangeLabel}
                RefreshLabelNameInNotes={props.RefreshNotesLabels}
                DeleteLabelFromNotes={props.DeleteLabelFromNotes}
              />
            );
          })}
        </LabelsContainer>
        <CloseButton onClick={props.Close}>Finish</CloseButton>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    labels: state.labels.labels,
    JustForRerender: state.labels.labels.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Close: () => dispatch({ type: action.OPEN_LABELS_MANAGER, display: false }),
    AddLabel: label => dispatch({ type: action.ADD_LABEL, label: label }),
    RemoveLabel: label => dispatch({ type: action.REMOVE_LABEL, label: label }),
    ChangeLabel: (label, id) =>
      dispatch({ type: action.RENAME_LABEL, label: label, id: id }),
    RefreshNotesLabels: (oldLabel, newLabel) =>
      dispatch({
        type: action.REFRESH_NOTES_LABELS_NAMES,
        oldLabel: oldLabel,
        newLabel: newLabel
      }),
    DeleteLabelFromNotes: label =>
      dispatch({ type: action.DELETE_LABEL_FROM_NOTES, label: label })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelManager);

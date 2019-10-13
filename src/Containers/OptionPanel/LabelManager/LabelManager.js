import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../Store/Actions/ActionType";

import Background from "../../../Components/Background";
import Label from "./Label";

const Absolute = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 500px;
  left: 0;
  margin: auto;
  z-index: 1000;
  width: 300px;
  height: 100px;
`;

const Container = styled.div`
  width: 400px;
  padding: 5px;
  max-height: 70vh;
  box-shadow: 0px 1px 5px #444444;
  border-radius: 10px;
  background: #eeeeee;
  text-align: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  margin: 3% 1%;
  border-radius: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SearchBar = styled.input`
  width: 70%;
  font-size: 20px;
  padding: 10px 12px 10px 16px;
  border-radius: 45px 0 0 45px;
  background: #fff;
  opacity: 0.9;
  transition: all 0.2s ease;
  :focus {
    opacity: 1;
  }
  ::placeholder {
    color: #1c1a1a;
  }
`;
const AddButton = styled.button`
  width: 30%;
  height: 43px;
  font-size: 16px;
  padding: 10px 12px 10px 16px;
  cursor: pointer;
  background: #ffffff;
  text-align: center;
  border-radius: 0 45px 45px 0;
`;
const LabelsContainer = styled.div`
  max-height: 60vh;
  width: 100%;
  display: inline-block;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    cursor: default;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;

const LabelManager = ({
  labels,
  AddLabel,
  RemoveLabel,
  ChangeLabel,
  Close,
  DeleteLabelFromNotes,
  RefreshNotesLabels,
  DataChange
}) => {
  const [SearchValue, setSearchValue] = useState("");

  const AddLabelHandler = () => {
    let isExist = false;
    for (let i = 0; i < labels.length; i++) {
      if (labels[i] === SearchValue) {
        isExist = true;
      }
    }
    if (!isExist && SearchValue !== "") {
      AddLabel(SearchValue);
      setSearchValue("");
    } else {
      console.log("You cant add label beacause it already exists");
    }
  };

  const CloseHandler = () => {
    Close();
    DataChange();
  };

  const filteredLabels = [...labels].filter(label => {
    return label.toLowerCase().includes(SearchValue.toLowerCase());
  });

  return (
    <>
      <Background onClick={CloseHandler} />
      <Absolute>
        <Container>
          <SearchWrapper>
            <SearchBar
              placeholder="Search"
              onChange={event => setSearchValue(event.target.value)}
              value={SearchValue}
            />
            <AddButton onClick={AddLabelHandler}>Add Label</AddButton>
          </SearchWrapper>
          <LabelsContainer>
            {filteredLabels.map((label, index) => {
              return (
                <Label
                  key={label}
                  id={index}
                  name={label}
                  Remove={RemoveLabel}
                  DeleteLabelFromNotes={DeleteLabelFromNotes}
                  Rename={ChangeLabel}
                  RefreshLabelNameInNotes={RefreshNotesLabels}
                />
              );
            })}
          </LabelsContainer>
        </Container>
      </Absolute>
    </>
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
      dispatch({ type: action.DELETE_LABEL_FROM_NOTES, label: label }),
    DataChange: () => {
      dispatch({ type: action.DATA_CHANGE, change: true });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelManager);

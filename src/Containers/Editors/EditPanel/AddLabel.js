import React, { useState, useMemo } from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../../SVGS/box.svg";
import { ReactComponent as TickedBoxIcon } from "../../../SVGS/box-ticked.svg";

import * as action from "../../../Store/Actions/ActionType";

import { connect } from "react-redux";

const Absolute = styled.div`
  position: absolute;
  top: ${props => props.top + "px"};
  right: ${props => props.right + "px"};
  margin: auto;
  z-index: 1000;
`;

const Container = styled.div`
  width: 150px;
  max-height: 200px;
  padding: 0 10px 10px 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 6px;
  background: #fefefe;
`;

const LabelsContainer = styled.div`
  width: 100%;
  max-height: 150px;
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

const LabelTag = styled.div`
  background: none;
  height: 22px;
  display: flex;
  padding: 2%;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;
const LabelText = styled.p`
  margin-left: 5px;
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
const SearchBar = styled.input`
  width: 92%;
  padding: 5px 4%;
  margin: 10px 0;
  font-size: 18px;
  text-align: left;
  border-radius: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: ${props => props.background};
`;

const AddLabel = ({ labels, notes, id, color, pos, ChangeLabels }) => {
  const [search, setSearch] = useState("");
  const MAX_LABEL_TEXT_LENGTH = 15;

  const [top, right] = useMemo(() => {
    const rect = pos.getBoundingClientRect();
    let widthReduction;
    let heightAdjust = 55;

    for (let i = 0; i < labels.length; i++) {
      heightAdjust += 30;
    }

    if (window.innerWidth < 400) {
      widthReduction = 0.5;
    } else {
      widthReduction = 0.3;
    }

    if (rect.height < window.innerHeight * 0.8) {
      heightAdjust = !heightAdjust;
    }

    let y = rect.top + window.scrollY + rect.height - heightAdjust;
    let x = rect.right + window.scrollX - rect.width * widthReduction;
    return [y, x];
  }, [pos, labels]);

  const TruncateText = (t, len) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

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

  const ChooseLabel = (i, isAdded, label) => {
    const newNoteLabels = [...notes[id].labels];
    const newLabels = [...changedLabels];
    if (isAdded) {
      newLabels[i].isAdded = false;
      newNoteLabels.splice(newNoteLabels.indexOf(label), 1);
    } else if (!isAdded) {
      newLabels[i].isAdded = true;
      newNoteLabels.push(newLabels[i].label);
    }
    setLabels(newLabels);
    ChangeLabels(newNoteLabels, id);
  };

  const fliteredLabels = [...changedLabels].filter(label => {
    return label.label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Absolute top={top} right={right}>
      <Container>
        <SearchBar
          onChange={event => setSearch(event.target.value)}
          background={color}
          placeholder="Search"
        />
        <LabelsContainer>
          {fliteredLabels.map((label, index) => {
            return (
              <LabelTag key={index}>
                <Icon
                  onClick={() => ChooseLabel(index, label.isAdded, label.label)}
                >
                  {label.isAdded ? <TickedBoxIcon /> : <BoxIcon />}
                </Icon>
                <LabelText>
                  {TruncateText(label.label, MAX_LABEL_TEXT_LENGTH)}
                </LabelText>
              </LabelTag>
            );
          })}
        </LabelsContainer>
      </Container>
    </Absolute>
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

import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import Masonry from "react-masonry-component";

import NoteCard from "../../Components/Notes/NoteCard";

const MasonryDisplay = styled(Masonry)`
  margin: 20px;
`;

const Container = styled.div`
  display: inline-block;
  float: left;
  width: 97%;
  height: 100%;
  background: #eeeeee;
`;

const NoteBoard = props => {
  const RenderNotes = () => {
    return props.notes.map((note, index) => {
      switch (note.type) {
        case "note":
          return (
            <NoteCard
              color={note.color}
              text={note.content}
              title={note.title}
              id={note.id}
              key={index}
              click={props.EditNote}
              labels={note.labels}
            />
          );
        default:
          return null;
      }
    });
  };

  let notes = RenderNotes();

  return (
    <Container>
      <MasonryDisplay>{notes}</MasonryDisplay>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    editMode: state.editing.editMode,
    RefreshWhenLabelsChange: state.notes.forceRefresh
  };
};

const mapDispatchToProps = dispatch => {
  return {
    EditNote: (noteType, editId, color) =>
      dispatch({
        type: action.EDIT_NOTE,
        noteType: noteType,
        editId: editId,
        color: color
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteBoard);

import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import Masonry from "react-masonry-component";

import NoteCard from "../../Components/Notes/NoteCard";
import ListCard from "../../Components/Notes/ListCard";
import SearchBar from "./SearchBar";

const MasonryDisplay = styled(Masonry)`
  margin: 20px;
  background: #eeeeee;
`;

const Container = styled.div`
  display: inline-block;
  float: left;
  width: 97%;
  height: 100%;
  background: #eeeeee;
  text-align: center;
`;

const NoteBoard = props => {
  const [search, setSearch] = useState({ value: "", type: "Title" });

  let filteredNotes = props.notes.filter(note => {
    if (search.value === "") {
      return note;
    } else {
      if (search.type === "Title") {
        return note.title.toLowerCase().includes(search.value.toLowerCase());
      } else if (search.type === "Content") {
        switch (note.type) {
          case "note":
            return note.content
              .toLowerCase()
              .includes(search.value.toLowerCase());
          default:
            console.log("Something is wrong because note doesnt have a type");
            return note;
        }
      }
    }
  });

  const RenderNotes = () => {
    return filteredNotes.map((note, index) => {
      switch (note.type) {
        case "note":
          return (
            <NoteCard
              color={note.color}
              content={note.content}
              title={note.title}
              id={note.id}
              key={index}
              Click={props.EditNote}
              labels={note.labels}
            />
          );
        case "list":
          return (
            <ListCard
              color={note.color}
              content={note.content}
              title={note.title}
              id={note.id}
              key={index}
              Click={props.EditNote}
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
      <SearchBar search={search} SetSearch={setSearch} />
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

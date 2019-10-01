import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import Masonry from "react-masonry-component";

import NoteCard from "../../Components/Notes/NoteCard";
import ListCard from "../../Components/Notes/ListCard";
import SearchBar from "./SearchBar";

const MasonryDisplay = styled(Masonry)`
  margin-right: 20px;
  margin-left: 65px;
  background: #eeeeee;
  position: relative;
`;

const Container = styled.div`
  display: block;
  float: left;
  width: calc(100vw - 45px - 16px);
  max-width: 1920px;
  height: 100%;
  background: #eeeeee;
  text-align: center;
`;

const NoteBoard = props => {
  const [search, setSearch] = useState({ value: "", type: "Title" });

  const MasonryOptions = {
    columnWidth: 284,
    transitionDuration: 0
  };

  const PlaceListContentIntoOneString = list => {
    let Text = "";
    list.map(parent => {
      Text = Text.concat(parent.name, " ");
      parent.childs.map(child => {
        Text = Text.concat(child.name, " ");
      });
    });
    return Text;
  };

  const PlaceLabelsIntoOneString = labels => {
    let Text = "";
    labels.map(label => {
      Text = Text.concat(label, " ");
    });
    return Text;
  };

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
          case "list":
            let text = PlaceListContentIntoOneString(note.content);
            return text
              .toLowerCase()
              .includes(search.value.toLocaleLowerCase());
          default:
            console.log("Something is wrong because note doesnt have a type");
            return note;
        }
      } else if (search.type === "Label") {
        let text = PlaceLabelsIntoOneString(note.labels);
        return text.toLowerCase().includes(search.value.toLowerCase());
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
      <MasonryDisplay options={MasonryOptions}>{notes}</MasonryDisplay>
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

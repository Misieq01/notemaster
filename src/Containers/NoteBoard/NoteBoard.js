import React, { useState, useMemo } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import Masonry from "react-masonry-component";

import Card from "../../Components/Notes/Card";
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
    list.map(e => {
      Text = Text.concat(e.name, " ");
      e.childs.map(el => {
        Text = Text.concat(el.name, " ");
      });
    });
    return Text;
  };

  const PlaceLabelsIntoOneString = labels => {
    let Text = "";
    labels.map(e => {
      Text = Text.concat(e, " ");
    });
    return Text;
  };

  const ContentHandler = (type, content, value) => {
    if (type === "note") {
      return content.toLowerCase().includes(value.toLowerCase());
    } else {
      return PlaceListContentIntoOneString(content)
        .toLowerCase()
        .includes(value.toLocaleLowerCase());
    }
  };

  const filteredNotes = props.notes.filter(note => {
    if (search.value === "") {
      return note;
    } else {
      switch (search.type) {
        case "Title":
          return note.title.toLowerCase().includes(search.value.toLowerCase());
        case "Content":
          return ContentHandler(note.type, note.content, search.value);
        case "Label":
          return PlaceLabelsIntoOneString(note.labels)
            .toLowerCase()
            .includes(search.value.toLowerCase());
        default:
          return note;
      }
    }
  });

  const Notes = filteredNotes.map((e, i) => {
    return (
      <Card
        color={e.color}
        content={e.content}
        title={e.title}
        id={e.id}
        key={i}
        Click={props.EditNote}
        labels={e.labels}
        type={e.type}
      />
    );
  });

  return (
    <Container>
      <SearchBar search={search} SetSearch={setSearch} />
      <MasonryDisplay options={MasonryOptions}>{Notes}</MasonryDisplay>
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

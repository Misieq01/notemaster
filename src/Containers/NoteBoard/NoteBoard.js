import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import Masonry from "react-masonry-component";

import Card from "../../Components/Notes/Card";
import SearchBar from "./SearchBar";

const MasonryDisplay = styled(Masonry)`
  background: #eeeeee;
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

const Container = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 60px;
  max-width: 1920px;
  background: #eeeeee;
  text-align: center;
  float: left;
  @media (min-width: 800px) {
    width: calc(100% - 67px);
    margin-bottom: 0;
  }
`;

const NoteBoard = props => {
  const [search, setSearch] = useState({ value: "", type: "Title" });

  const MasonryOptions = {
    columnWidth: 264,
    transitionDuration: 0,
    fitWidth: true,
    gutter: 20
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

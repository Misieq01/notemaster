import React from "react";
import styled from "styled-components";

import {connect} from 'react-redux'

import SearchBar from "../Components/SearchBar";
import NoteCard from "../Components/NoteCard";
import Masonry from 'react-masonry-component';

const Container = styled.div`
  min-height: 100vh;
  width: 97vw;
  background: #eeeeee;
  text-align:center;
`;

const MasonryWrapper = styled(Masonry)`
  margin: 10px 15px 10px 15px;
  z-index :1;
`

const NoteBoard = props => {

  return (
    <Container>
      <SearchBar />
      <MasonryWrapper>
        {" "}
        {props.notes.map((data, index) => {
          if (data.type === "note") {
            return (
              <NoteCard
                title={data.title}
                text={data.content}
                id={data.id}
                key={index}
              />
            );
          }
          return null;
        })}
      </MasonryWrapper>
    </Container>
  );
};

const mapStateToProps = state =>{
  return{
    notes: state.notes,
    id: state.id,
    editId: state.editId
  }
}

export default connect(mapStateToProps)(NoteBoard);

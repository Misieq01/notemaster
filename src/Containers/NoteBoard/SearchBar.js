import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 600px;
  height: 45px;
  font-size: 21px;
  display: inline-block;
  border-radius: 6px 0px 0px 6px;
  border: none;
  outline: none;
  text-decoration: none;
`;

const TypeBox = styled.div`
  font-size: 20px;
  padding: 10px;
  width: 100px;
  height: 45px;
  border-radius: 0px 6px 6px 0px;
  background: red;
  display: inline-block;
  line-height: 45px;
  cursor: pointer;
`;

const SearchBar = props => {
  const ChangeSearchType = () => {
    if (props.search.type === "Title") {
      props.SetSearch({ ...props.search, type: "Content" });
    } else if (props.search.type === "Content") {
      props.SetSearch({ ...props.search, type: "Label" });
    } else if (props.search.type === "Label") {
      props.SetSearch({ ...props.search, type: "Title" });
    }
  };

  return (
    <Container>
      <SearchInput
        placeholder="Search for notes"
        onChange={event =>
          props.SetSearch({ ...props.search, value: event.target.value })
        }
      ></SearchInput>
      <TypeBox onClick={ChangeSearchType}>By {props.search.type}</TypeBox>
    </Container>
  );
};

export default SearchBar;

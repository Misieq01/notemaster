import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 20px 40px 20px;
  display: flex;
  justify-content: center;
  background: #fff;
  align-items: center;
  width: 740px;
  border-radius: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SearchInput = styled.input`
  padding: 10px 16px 10px 24px;
  width: 600px;
  height: 45px;
  font-size: 21px;
  display: inline-block;
  border-radius: 45px 0px 0px 45px;
  text-decoration: none;
  background: #fff;
  opacity: 0.7;
  transition: all 155ms ease;
  :focus {
    opacity: 1;
  }
  ::placeholder {
    color: #1c1a1a;
  }
`;

const TypeBox = styled.div`
  font-size: 20px;
  padding: 10px 16px 10px 10px;
  min-width: 100px;
  border-radius: 0px 6px 6px 0px;
  color: #f3b500;
  cursor: pointer;
  user-select: none;
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
    <div style={{ display: "inline-block" }}>
      <Container>
        <SearchInput
          placeholder="Search for notes"
          onChange={event =>
            props.SetSearch({ ...props.search, value: event.target.value })
          }
        ></SearchInput>
        <TypeBox onClick={ChangeSearchType}>
          by {props.search.type.toLowerCase()}
        </TypeBox>
      </Container>
    </div>
  );
};

export default SearchBar;

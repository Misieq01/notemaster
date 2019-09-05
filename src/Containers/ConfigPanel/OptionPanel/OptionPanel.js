import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../Store/Actions/ActionType";

import ChooseAddType from "./ChooseAddType";

import { ReactComponent as AddIcon } from "../../../SVGS/add.svg";

const Container = styled.div`
  display: inline-block;
  float: right;
  width: 5%;
  height: 100vh;
  background: lightblue;
`;

const Icon = styled.svg`
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionPanel = props => {
  const [addPanel, setAddPanel] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Icon onClick={() => setAddPanel(true)}>
          <AddIcon />
        </Icon>
        {addPanel ? (
          <ChooseAddType close={setAddPanel} createNote={props.CreateNote} />
        ) : null}
      </Wrapper>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    CreateNote: type => dispatch({ type: action.CREATE_NOTE, noteType: type })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OptionPanel);

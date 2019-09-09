import React, { useState } from "react";
import styled from "styled-components";

import firebase from "../../../../config/config";

import { connect } from "react-redux";
import * as action from "../../../../Store/Actions/ActionType";

import ChooseAddType from "./ChooseAddType";

import { ReactComponent as AddIcon } from "../../../../SVGS/add.svg";
import { ReactComponent as LogoutIcon } from "../../../../SVGS/logout.svg";
import { ReactComponent as LabelsIcon } from "../../../../SVGS/tags.svg";

const Container = styled.div`
  height: 100vh;
  width: 3%;
  background: #eeeeee;
  text-align: center;
  border-left: 2px solid #4a89ff;
  position: fixed;
  right: 0;
  top: 0;
  margin: auto;
  z-index: 100;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
  display: block;
  margin-bottom: 25px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OptionPanel = props => {
  const [addPanel, setAddPanel] = useState(false);

  const SingOut = () => {
    firebase.auth().signOut();
  };

  return (
    <Container>
      <Wrapper>
        <Icon onClick={SingOut}>
          <LogoutIcon title="Logout" />
        </Icon>
        <Icon onClick={() => setAddPanel(true)}>
          <AddIcon title="Add Note" />
        </Icon>
        {addPanel ? (
          <ChooseAddType close={setAddPanel} createNote={props.CreateNote} />
        ) : null}
        <Icon onClick={props.OpenLabelsManager}>
          <LabelsIcon title="Edit Labels" />
        </Icon>
      </Wrapper>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    CreateNote: type => dispatch({ type: action.CREATE_NOTE, noteType: type }),
    OpenLabelsManager: () =>
      dispatch({ type: action.OPEN_LABELS_MANAGER, display: true })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OptionPanel);

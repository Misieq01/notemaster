import React, { useState } from "react";
import styled from "styled-components";

import auth from "../../Server/auth";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import ChooseAddType from "./ChooseAddType";
import LabelManager from "./LabelManager/LabelManager";
import Portal from "../../Components/Portal";

import { ReactComponent as AddIcon } from "../../SVGS/circle_plus.svg";
import { ReactComponent as LogoutIcon } from "../../SVGS/logout.svg";
import { ReactComponent as LabelsIcon } from "../../SVGS/tags.svg";

const Container = styled.div`
  height: 100%;
  padding: 0 1.2rem;
  background: #eeeeee;
  text-align: center;
  border-left: 2px solid rgba(21, 21, 21, 0.14);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  display: block;
  margin-bottom: 25px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 0;
`;

const OptionPanel = ({ id, AddNote, StartEditing }) => {
  const [addPanel, setAddPanel] = useState(false);
  const [labelManager, setLabelManager] = useState(false);

  const Logout = () => {
    auth.signOut();
  };

  const CreateNoteHandler = type => {
    AddNote(type);
    StartEditing(type, id);
  };

  const PanelElement = addPanel ? (
    <Portal setState={() => setAddPanel(false)}>
      <ChooseAddType
        CreateNote={CreateNoteHandler}
        Close={() => setAddPanel(false)}
      />
    </Portal>
  ) : null;

  const LabelElement = labelManager ? (
    <Portal>
      <LabelManager Close={() => setLabelManager(false)} />
    </Portal>
  ) : null;

  const LogoutButton = (
    <Wrapper>
      <Icon onClick={Logout}>
        <LogoutIcon title="Logout" />
      </Icon>
    </Wrapper>
  );

  return (
    <Container>
      <Wrapper>
        <Icon onClick={() => setAddPanel(true)}>
          <AddIcon title="Add Note" />
        </Icon>
        {PanelElement}
        <Icon onClick={() => setLabelManager(true)}>
          <LabelsIcon title="Edit Labels" />
        </Icon>
        {LabelElement}
      </Wrapper>
      {LogoutButton}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    id: state.notes.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    StartEditing: (type, id) =>
      dispatch({
        type: action.START_EDITING,
        noteType: type,
        color: "#fff269",
        id: id
      }),
    AddNote: type => dispatch({ type: action.ADD_NOTE, noteType: type })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionPanel);

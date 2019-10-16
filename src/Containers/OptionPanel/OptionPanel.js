import React, { useState, useRef } from "react";
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
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: 100vw;
  background: #eeeeee;
  text-align: center;
  border-top: 2px solid rgba(21, 21, 21, 0.14);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row nowrap;

  @media (min-width: 800px) {
    flex-flow: column wrap;
    justify-content: space-between;
    border-top: none;
    border-left: 2px solid rgba(21, 21, 21, 0.14);
    width: 45px;
    height: calc(100vh - 40);
    padding: 20px 10px;
    right: none;
    bottom: none;
    top: 0;
    right: 0;
  }
`;

const Icon = styled.div`
  width: 30px;
  padding: 10px
  height: 30px;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  display: block;
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  @media (min-width: 800px) {
    flex-flow: column wrap;
  }
`;

const OptionPanel = ({ id, AddNote, StartEditing }) => {
  const [addPanel, setAddPanel] = useState(false);
  const [labelManager, setLabelManager] = useState(false);

  const addPanelRef = useRef();

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
        addPanelRef={addPanelRef.current}
      />
    </Portal>
  ) : null;

  const LabelElement = labelManager ? (
    <Portal>
      <LabelManager Close={() => setLabelManager(false)} />
    </Portal>
  ) : null;

  const LogoutButton = (
    <Icon onClick={Logout} style={{ alignSelf: "flex-end" }}>
      <LogoutIcon title="Logout" />
    </Icon>
  );

  return (
    <Container>
      <Wrapper id="chuj">
        <Icon
          onClick={() => setAddPanel(true)}
          style={{ alignSelf: "flex-start" }}
          ref={addPanelRef}
        >
          <AddIcon title="Add Note" />
        </Icon>
        <Icon
          onClick={() => setLabelManager(true)}
          style={{ alignSelf: "flex-start" }}
        >
          <LabelsIcon title="Edit Labels" />
        </Icon>
      </Wrapper>
      {PanelElement}
      {LabelElement}
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

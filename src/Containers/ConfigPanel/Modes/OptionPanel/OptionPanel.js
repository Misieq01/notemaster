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
  max-height: 100%;
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

const OptionPanel = props => {
  const [addPanel, setAddPanel] = useState(false);

  const SingOut = () => {
    firebase.auth().signOut();
  };

  const CreateNoteHandler = type => {
    props.AddNote(type);
    props.StartEditing(type, props.id);
  };

  return (
    <Container>
      <Wrapper>
        <Icon onClick={() => setAddPanel(true)}>
          <AddIcon title="Add Note" />
        </Icon>
        {addPanel ? (
          <ChooseAddType Close={setAddPanel} CreateNote={CreateNoteHandler} />
        ) : null}
        <Icon onClick={props.OpenLabelsManager}>
          <LabelsIcon title="Edit Labels" />
        </Icon>
      </Wrapper>
      <Wrapper>
        <Icon onClick={SingOut}>
          <LogoutIcon title="Logout" />
        </Icon>
      </Wrapper>
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
        color: "#eeeeee",
        id: id
      }),
    AddNote: type => dispatch({ type: action.ADD_NOTE, noteType: type }),
    OpenLabelsManager: () =>
      dispatch({ type: action.OPEN_LABELS_MANAGER, display: true })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionPanel);

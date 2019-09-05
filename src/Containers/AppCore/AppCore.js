import React, { useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import ConfigPanel from "../ConfigPanel/ConfigPanel";
import NoteBoard from "../NoteBoard/NoteBoard";
import Editor from "../Editors/Editor";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const AppCore = props => {
  useEffect(() => {
    return () => {
      if (props.mode) {
        props.SaveDataToServer(props.notes, props.labels);
      }
    };
  }, [props]);

  return (
    <AppContainer>
      {props.mode ? <Editor /> : null}
      <ConfigPanel />
      <NoteBoard />
    </AppContainer>
  );
};

const mapStateToProps = state => {
  return {
    mode: state.editNote.editMode,
    notes: state.coreData.notes,
    labels: state.coreData.labels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SaveDataToServer: (notes, labels) =>
      dispatch({
        type: action.SAVE_DATA_TO_SERVER,
        notes: notes,
        labels: labels
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppCore);

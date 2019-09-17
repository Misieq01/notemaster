import React, { useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../Store/Actions/ActionType";

import ConfigPanel from "../ConfigPanel/ConfigPanel";
import NoteBoard from "../NoteBoard/NoteBoard";
import Editor from "../Editors/Editor";
import LabelsManager from "../LabelManager/LabelManager";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const AppCore = props => {
  useEffect(() => {
    return () => {
      if (props.mode || props.labelsDisplay) {
        props.SaveDataToServer(props.notes, props.labels);
      }
    };
  }, [props, props.mode, props.labelsDisplay]);

  return (
    <AppContainer>
      {props.mode ? <Editor /> : null}
      {props.labelsDisplay ? <LabelsManager /> : null}
      <ConfigPanel />
      <NoteBoard />
    </AppContainer>
  );
};

const mapStateToProps = state => {
  return {
    mode: state.editNote.editMode,
    notes: state.coreData.notes,
    labels: state.coreData.labels,
    labelsDisplay: state.labelMng.display
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

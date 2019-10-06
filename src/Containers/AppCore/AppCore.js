import React, { useEffect, useMemo } from "react";
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

const AppCore = ({ mode, labelsDisplay, SaveDataToServer }) => {
  useEffect(() => {
    return () => {
      if (mode || labelsDisplay) {
        SaveDataToServer();
      }
    };
  }, [mode, labelsDisplay, SaveDataToServer]);

  return (
    <AppContainer>
      {mode ? <Editor /> : null}
      {labelsDisplay ? <LabelsManager /> : null}
      <ConfigPanel />
      <NoteBoard />
    </AppContainer>
  );
};

const mapStateToProps = state => {
  return {
    mode: state.editing.editMode,
    labelsDisplay: state.labels.display
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SaveDataToServer: () =>
      dispatch({
        type: action.SAVE_DATA_TO_SERVER
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppCore);

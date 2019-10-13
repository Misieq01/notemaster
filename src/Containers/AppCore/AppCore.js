import React from "react";

import { connect } from "react-redux";

import OptionPanel from "../OptionPanel/OptionPanel";
import NoteBoard from "../NoteBoard/NoteBoard";
import Editor from "../Editors/Editor";

const AppCore = ({ mode }) => {
  return (
    <div>
      {mode ? <Editor /> : null}
      <OptionPanel />
      <NoteBoard />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mode: state.editing.editMode
  };
};

export default connect(mapStateToProps)(AppCore);

import React from "react";

import { connect } from "react-redux";

import OptionPanel from "./Modes/OptionPanel/OptionPanel";
import EditPanel from "./Modes/EditPanel/EditPanel";

const ConfigPanel = ({ editMode }) => {
  return <div>{editMode ? <EditPanel /> : <OptionPanel />}</div>;
};

const mapStateToProps = state => {
  return {
    editMode: state.editing.editMode
  };
};

export default connect(mapStateToProps)(ConfigPanel);

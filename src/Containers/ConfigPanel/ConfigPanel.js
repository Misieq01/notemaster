import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import OptionPanel from "./Modes/OptionPanel/OptionPanel";
import EditPanel from "./Modes/EditPanel/EditPanel";

const ConfigPanel = props => {
  return <div>{props.editMode ? <EditPanel /> : <OptionPanel />}</div>;
};

const mapStateToProps = state => {
  return {
    editMode: state.editNote.editMode
  };
};

export default connect(mapStateToProps)(ConfigPanel);

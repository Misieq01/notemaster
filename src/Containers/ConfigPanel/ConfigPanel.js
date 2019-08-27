import React from "react";
//import styled from 'styled-components';

import { connect } from "react-redux";

import OptionMode from "./Modes/OptionMode/OptionMode";
import EditMode from "./Modes/EditMode";

const ConfigPanel = props => {
  return <div>{props.editMode ? <EditMode /> : <OptionMode />}</div>;
};

const mapStateToProps = state => {
  return {
    editMode: state.editMode
  };
};

export default connect(mapStateToProps)(ConfigPanel);

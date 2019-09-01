import React from "react";
import styled from 'styled-components';

import ConfigPanel from './ConfigPanel/ConfigPanel'
import NoteBoard from './NoteBoard'
import Editor from './Editors/Editor';
import LabelManager from '../Containers/ConfigPanel/Modes/OptionMode/LabelManager';

import {connect} from 'react-redux';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: orange;
`;

const ApplicationCore = props => {

  return <Container >
    {props.editMode ? <Editor/> : null}
    {props.displayLabelManager ? <LabelManager/> : null}
    <ConfigPanel/>
    <NoteBoard/>
  </Container>;
};

const mapStateToProps = state =>{
  return{
    editMode: state.editMode,
    displayLabelManager: state.displayLabelManager,
  }
}

export default connect(mapStateToProps)(ApplicationCore);

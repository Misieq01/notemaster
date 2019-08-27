import React from "react";
import styled from 'styled-components';

import ConfigPanel from './ConfigPanel/ConfigPanel'
import NoteBoard from './NoteBoard'
import Editor from './Editors/Editor';


import {connect} from 'react-redux';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: orange;
`;

const ApplicationCore = props => {

  return <Container >
    {props.editMode ? <Editor/> : null}
    <ConfigPanel/>
    <NoteBoard/>
  </Container>;
};

const mapStateToProps = state =>{
  return{
    editMode: state.editMode,
    state:state
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    LoadData: data=>{dispatch({type:'LOAD_DATA_FROM_LOCALSTORAGE',data:data})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ApplicationCore);

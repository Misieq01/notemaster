import React from "react";
import styled from "styled-components";

import {connect} from 'react-redux';

const Container = styled.div`
  height: 200px;
  width: 400px;
  background: #eeeeee;
  box-shadow: 0px 1px 5px #cccccc;
  position:fixed;
  margin:auto;
  right:2.5vw;
  top:10px;
  border-radius 5px;
  z-index: 500;
`;

const Tab = styled.div`
  width: 100%;
  height: 25%;
  transition: all 0.2s ease-in-out;
  :hover {
    background: #dddddd;
  }
  font-size: 20px;
  line-height: 50px;
  cursor:pointer;
`;

const CloseButton = styled.button`
  height: 15%;
  width: 50%;
  margin: 1.5%;
  cursor: pointer;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  background: #5496ff;
  color: #eeeeee;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
  font-size: 20px;
`;

const NoteSelectionPanel = props => {
  return (
    <Container>
      <Tab onClick={()=>props.OpenEditNote('note')}>Note</Tab>
      <Tab>List</Tab>
      <Tab>Remainder</Tab>
      <CloseButton onClick={props.close}>Close</CloseButton>
    </Container>
  );
};

const mapDispatchToProps = dispatch =>{
  return{
    OpenEditNote: editType =>{dispatch({ type: 'EDIT_MODE_CHANGER' ,editType:editType,editMode: true,editId:'none'})}
  }
}

export default connect(null,mapDispatchToProps)(NoteSelectionPanel);

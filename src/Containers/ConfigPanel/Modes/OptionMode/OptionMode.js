import React, { useState } from "react";
import styled from "styled-components";

import firebase from '../../../../config/config';
import db from '../../../../config/database';
import {connect} from 'react-redux';

import NoteTypeSelectionPanel from "./NoteSelectionPanel";
////////////  CSS  ////////////////////////////

const Container = styled.div`
  height: 100vh;
  width: 3%;
  background: #eeeeee;
  float: right;
  text-align: center;
  border-left: 2px solid #4a89ff;
`;

const Icon = styled.span`
  font-size: 40px;
  text-align: center;
  color: #333634;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.3);
  }
`;

///////////////////////////////////////////////

const OptionMode = props => {
  const [
    displayNoteTypeSelectionPanel,
    setDislpayNoteSelectionPanel
  ] = useState(false);

  const SignOutHandler = () =>{
    db.collection('users').doc(firebase.auth().currentUser.uid).update({
      'noteData.id' : props.data.id,
      'noteData.labels' : props.data.labels,
      'noteData.notes' : props.data.notes
    })
    firebase.auth().signOut();
  }


  return (
    <Container>
      <Icon title="LogOut" onClick={SignOutHandler }>
        &#10919;
      </Icon>
      <Icon title="Add Note" onClick={() => setDislpayNoteSelectionPanel(true)}>
        &#43;
      </Icon>
      {displayNoteTypeSelectionPanel ? (
        <NoteTypeSelectionPanel
          close={() => setDislpayNoteSelectionPanel(false)}
        />
      ) : null}
      <Icon title="Manage Labels" onClick={props.OpenLabelManager}>
        &#9839;
      </Icon>
    </Container>
  );
};

const mapStateToProps = state =>{
  return {
    data: state
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    OpenLabelManager: ()=>{dispatch({type:'SHOW/HIDE_LABEL_MANAGER',display:true})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OptionMode);

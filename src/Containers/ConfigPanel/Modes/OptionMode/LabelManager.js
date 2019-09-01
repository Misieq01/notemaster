import React from "react";
import styled from "styled-components";

import {connect} from 'react-redux';

const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  z-index: 999;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 30%;
  height: 70%;
  background:#eeeeee;
  box-shadow: 0px 1px 5px #777777;
  z-index:1000;
  text-align: center;
`;

const CloseButton = styled.button`
  height: 5%;
  width: 80%;
  margin: 1.5%;
  cursor: pointer;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  background: #5496ff;
  color: #eeeeee;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.05);
  }
  font-size: 20px;
`;

const SearchBar = styled.input`
  width: 70%;
  height: 35px;
  display: inline-block;
  background: orange;
  margin: 20px;
`

const LabelManager = props => {
  return (
    <div>
      <Background />
      <Container>
        <SearchBar/>
        <CloseButton onClick={props.CloseLabel}>Close</CloseButton>
      </Container>
    </div>
  );
};

const mapPropsToState = state =>{
    return{

    }
}

const mapDispatchToProps = dispatch =>{
    return {
      CloseLabel: () => dispatch({ type: "SHOW/HIDE_LABEL_MANAGER" ,display:false})
    };
}

export default connect(mapPropsToState,mapDispatchToProps)(LabelManager);

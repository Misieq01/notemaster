import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../../Store/Actions/ActionType";

const Container = styled.div`
  width: 300px;
  height: 200px;
  background: #eeeeee;
  border-radius 5px;
  box-shadow: 0px 1px 5px #888888;
  position:absolute;
  z-index: 600;
  top: 150px;
  right: 100px;
`;
const Color = styled.div`
  width: 20%;
  height: 80%;
  border-radius: ${props => props.rounded || "none"}
  background: ${props => props.background || "red"};
  display: inline-block;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover{
    transform: scale(1.05)
  }
`;
const CloseButton = styled.button`
  height: 20%;
  width: 100%;
  cursor: pointer;
  border: 2px solid #5496ff;
  text-decoration: none;
  border-radius: 0px 0px 5px 5px;
  background: #5496ff;
  color: #eeeeee;
  transition: all 0.3s ease-in-out;
  :hover {
    background: #eeeeee;
    color: black;
  }
  font-size: 20px;
  margin-top: -4px;
`;

const ColorPicker = props => {
  const ChangeColorHandler = color => {
    props.ChangeColor(color);
    props.Close();
  };

  return (
    <Container>
      <Color
        background="##ff6b6b"
        rounded="5px 0px 0px 0px"
        onClick={() => ChangeColorHandler("##ff6b6b")}
      />
      <Color
        background="#ffcc4d"
        onClick={() => ChangeColorHandler("#ffcc4d")}
      />
      <Color
        background="#5bcffc"
        onClick={() => ChangeColorHandler("#5bcffc")}
      />
      <Color
        background="#8ced66"
        onClick={() => ChangeColorHandler("#8ced66")}
      />
      <Color
        background="#eeeeee"
        rounded="0px 5px 0px 0px"
        onClick={() => ChangeColorHandler("#eeeeee")}
      />
      <CloseButton onClick={props.Close}>Close</CloseButton>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    ChangeColor: color => dispatch({ type: action.CHANGE_COLOR, color: color })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ColorPicker);

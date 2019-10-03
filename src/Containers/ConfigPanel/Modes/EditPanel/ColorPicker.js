import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../../Store/Actions/ActionType";

import { ReactComponent as CloseIcon } from "../../../../SVGS/x.svg";

const Container = styled.div`
  width: 450px;
  height: 170px;
  background: #eeeeee;
  border-radius 8px;
  box-shadow: 0px 1px 5px #888888;
  position:absolute;
  z-index: 600;
  top: 10px;
`;
const Color = styled.div`
  width: 20%;
  height: 100%;
  border-radius: ${props => props.rounded || "none"}
  background: ${props => props.background || "red"};
  display: inline-block;
  transition: all 0.2s ease-in-out;
  opacity: 0.8
  cursor: pointer;
  :hover{
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 15px;
  height: 15px;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -30px;
  bottom: 0;
  margin: auto;
  background: #eeeeee;
  padding: 5px;
  border-radius: 50%;
  :hover {
    transform: scale(1.1);
  }
`;

const ColorPicker = props => {
  const ChangeColorHandler = color => {
    props.ChangeColor(color);
    props.Close();
  };

  return (
    <Container>
      <Color
        background="#fff269"
        rounded="8px 0px 0px 8px"
        onClick={() => ChangeColorHandler("#fff269")}
      />
      <Color
        background="#ffab8c"
        onClick={() => ChangeColorHandler("#ffab8c")}
      />
      <Color
        background="#7ee5fc"
        onClick={() => ChangeColorHandler("#7ee5fc")}
      />
      <Color
        background="#97ff6e"
        onClick={() => ChangeColorHandler("#97ff6e")}
      />
      <Color
        background="#fec4ff"
        rounded="0px 8px 8px 0px"
        onClick={() => ChangeColorHandler("#fec4ff")}
      />
      <Icon>
        <CloseIcon onClick={props.Close} />
      </Icon>
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

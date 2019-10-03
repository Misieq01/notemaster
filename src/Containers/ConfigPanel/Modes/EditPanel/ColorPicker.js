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
  right: 250px;
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

const ColorPicker = props => {
  const ChangeColorHandler = color => {
    props.ChangeColor(color);
    props.Close();
  };

  return (
    <Container>
      <Color
        background="#ff6b6b"
        rounded="5px 0px 0px 0px"
        onClick={() => ChangeColorHandler("#ff6b6b")}
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

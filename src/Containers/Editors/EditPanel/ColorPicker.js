import React, { useMemo } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import * as action from "../../../Store/Actions/ActionType";

const Absolute = styled.div`
  position: absolute;
  top: ${props => props.top + "px"};
  right: ${props => props.right + "px"};
  margin: auto;
  z-index: 1000;
`;

const Container = styled.div`
  width: 200px;
  padding: 10px;
  background: #fefefe;
  border-radius 8px;
  box-shadow: 0px 1px 5px #888888;
  position:absolute;
  z-index: 600;
  bottom: 1%;
  left: 8%;
  display: flex;
  flex-flow: row nowrap;
  justify-content:center;
  align-items: center;
`;
const Color = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  background: ${props => props.background || "red"};
  border-radius: 100%;
  transition: all 0.2s ease-in-out;
  opacity: 0.8
  cursor: pointer;
  :hover{
    opacity: 1;
  }
`;

const ColorPicker = ({ pos, Close, ChangeColor }) => {
  const [top, right] = useMemo(() => {
    const rect = pos.getBoundingClientRect();
    let y = rect.top + window.scrollY + rect.height - 20;
    let x = rect.right + window.scrollX - rect.width * 0.1;
    return [y, x];
  }, [pos]);

  const ChangeColorHandler = color => {
    ChangeColor(color);
    Close();
  };

  return (
    <Absolute top={top} right={right}>
      <Container>
        <Color
          background="#fff269"
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
          onClick={() => ChangeColorHandler("#fec4ff")}
        />
      </Container>
    </Absolute>
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

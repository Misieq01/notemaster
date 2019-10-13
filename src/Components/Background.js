import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 120;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Background = ({ onClick }) => {
  return <Container onClick={onClick}></Container>;
};

export default Background;

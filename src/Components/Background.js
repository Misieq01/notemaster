import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Background = () => {
  return <Container></Container>;
};

export default Background;

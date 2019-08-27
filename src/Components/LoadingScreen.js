import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: tomato;
  visibility: visible;
  opacity: 1;
`;

const LoadingScreen = () =>{
    return <Container>LoadingScreen</Container>
}

export default LoadingScreen;
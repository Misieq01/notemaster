import React from "react";
import styled from "styled-components";

import {connect} from 'react-redux';

const Container = styled.div`
  height: 100vh;
  width: 20vw;
  background: #eeeeee;
  float: right;
  position: fixed;
  right: 0;
  top: 0;
  margin: auto;
  z-index: 1000;
  border-left: 2px solid #4a89ff;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 3%;
  background: #eeeeee;
  float: right;
  border-left: 2px solid #4a89ff;
`;

const EditMode = () => {
  return <div><Wrapper/><Container>EditMode</Container></div>;
};

export default EditMode;

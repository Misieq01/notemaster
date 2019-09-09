import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

const Container = styled.div`
  position: absolute;
  top: 100px;
  right: 100px;
  margin: auto;
  width: 200px;
  height: 300px;
  box-shadow: 0px 1p 5px #777777;
  border-radius: 6px;
  background: #eeeeee;
`;

const AddLabel = props => {
  return <Container>AddLabel</Container>;
};

const mapStateToProps = state => {
  return {
    labels: state.coreData.labels
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default AddLabel;

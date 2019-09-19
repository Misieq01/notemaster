import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: auto;
  width: 21vw;
  height: 20vw;
  box-shadow: 0px 1p 5px #777777;
  border-radius: 6px;
  background: red;
  text-align: center;
`;

const Button = styled.div`
  display:inline-block;
  background: #5496ff;
  color: #eeeeee;
  width: 90%;
  font-size: 25px;
  padding 5px;
  text-align: center;
  cursor:pointer;
  transition: all 0.2s ease-in-out;
  border-radius:4px;
  :hover{
    transform: scale(1.05)
  }
`;
const LabelTag = styled.span`
  background: #eeeeee;
  padding: 2px;
  min-width: 20px;
  display: inline-block;
  cursor: pointer;
  margin: 2px;
`;

const AddLabel = props => {
  const [labels, setLabels] = useState([]);

  const ChooseLabel = event => {
    let newLabels = [...labels];
    if (event.target.style.background === "rgb(204, 204, 204)") {
      event.target.style.background = "#eeeeee";
      newLabels.splice(newLabels.indexOf(props.labels[event.target.id]), 1);
      setLabels(newLabels);
    } else {
      event.target.style.background = "#cccccc";
      newLabels.push(props.labels[event.target.id]);
      setLabels(newLabels);
    }
  };

  const AddLabelHandler = () => {
    props.AddLabel(props.id, labels);
    props.Close();
  };

  return (
    <Container>
      <p>Choose labels to add</p>
      {props.labels.map((label, index) => {
        return (
          <LabelTag
            key={index}
            children={label}
            id={index}
            onClick={event => ChooseLabel(event)}
          />
        );
      })}
      <Button onClick={AddLabelHandler}>Add</Button>
      <Button onClick={props.Close}>Cancel</Button>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    labels: state.coreData.labels,
    id: state.editNote.editId
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLabel);

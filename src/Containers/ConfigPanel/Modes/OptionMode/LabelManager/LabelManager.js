import React,{useState} from "react";
import styled from "styled-components";

import LabelBox from './LabelBox';

import {connect} from 'react-redux';

const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  z-index: 999;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 30%;
  height: 70%;
  background:#eeeeee;
  box-shadow: 0px 1px 5px #777777;
  z-index:1000;
  text-align: center;
`;

const Button = styled.button`
  height: 5%;
  width: 80%;
  margin: 1.5%;
  cursor: pointer;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  background: ${props => props.background || '#eeeeee'};
  color: ${props => props.color || '#111111'};
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.05);
  }
  font-size: 20px;
`

const SearchBar = styled.input`
  width: 90%;
  height: 35px;
  background: orange;
  font-size: 25px;
  border: none;
  outline: none;
  text-decoration: none;
  display: inline-block;
  position: relative;
  margin: 20px 20px 10px 20px;

`
const LabelContainer = styled.div`
  width: 90%;
  height: 70%;
  display:inline-block;
`



const LabelManager = props => {

  const [inputValue,setInputValue] = useState('');


  return (
    <div>
      <Background />
      <Container>
        <SearchBar
          placeholder="Search or Add label"
          onChange={event => setInputValue(event.target.value)}
          value={inputValue}
        />
        <Button background="#68f53d" color="#222222" onClick={()=>props.AddLabel(inputValue)}>
          Add Label
        </Button>
        <LabelContainer>
          {props.labels.map((label, index) => {
            return <LabelBox name={label} key={index} />
          })}
        </LabelContainer>
        <Button background="#5496ff" color="#eeeeee" onClick={props.CloseLabel}>
          Close
        </Button>
      </Container>
    </div>
  )
};

const mapPropsToState = state =>{
    return{
      labels: state.labels
    }
}

const mapDispatchToProps = dispatch =>{
    return {
      CloseLabel: () => dispatch({ type: "SHOW/HIDE_LABEL_MANAGER" ,display:false}),
      AddLabel: name => dispatch({type:'ADD_LABEL',name:name})
    };
}

export default connect(mapPropsToState,mapDispatchToProps)(LabelManager);

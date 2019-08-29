import React from 'react'
import styled from 'styled-components';

import {connect} from 'react-redux';

const Container = styled.div`
    position:fixed;
    right: 300px;
    top: 180px;
    width: 200px;
    height: 150px;
    background: #eeeeee;
    box-shadow: 0px 1px 5px #cccccc;
    text-align:center;
    border-radius: 5px;
`

const Wrapper = styled.div`
    margin: 10px;
`

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: inline-block;
  margin: 7px;
  background: ${props => props.color || "red"};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover{
      transform:scale(1.2);
  }
`;

const Button = styled.div`
  width: 90%;
  border-radius: 10px;
  margin: 5%;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  background: #fa4166;
  color: white;
  font-size:18x;
  :hover{
      transform:scale(1.05)
  }
`;


const ColorPicker = props =>{

    const ColorChangeHandler = color =>{
        props.ChangeColor(color);
        props.Close();
    }

    return (
      <Container>
        <Wrapper>
          <ColorCircle
            color="#ff4d58"
            onClick={event => ColorChangeHandler("#ff4d58")}
          />
          <ColorCircle
            color="#ff78bb"
            onClick={() => ColorChangeHandler("#ff78bb")}
          />
          <ColorCircle
            color="#d278ff"
            onClick={() => ColorChangeHandler("#d278ff")}
          />
          <ColorCircle
            color="#788eff"
            onClick={() => ColorChangeHandler("#788eff")}
          />
          <ColorCircle
            color="#78c9ff"
            onClick={() => ColorChangeHandler("#78c9ff")}
          />
          <ColorCircle
            color="#80ff86"
            onClick={() => ColorChangeHandler("#80ff86")}
          />
          <ColorCircle
            color="#ffc080"
            onClick={() => ColorChangeHandler("#ffc080")}
          />
          <ColorCircle
            color="white"
            onClick={() => ColorChangeHandler("white")}
          />
        </Wrapper>
        <Button onClick={props.Close}>Cancle</Button>
      </Container>
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        ChangeColor: color=>dispatch({type:'CHANGE_NOTE_COLOR',color:color})
    }
}

export default connect(null,mapDispatchToProps)(ColorPicker);
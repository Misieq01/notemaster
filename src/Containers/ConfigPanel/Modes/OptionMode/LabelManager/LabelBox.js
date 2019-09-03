import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 40%;
  height: 30px;
  font-size: 20px;
`

const LabelBox = props =>{
  return <Container>{props.name}</Container>
}

export default LabelBox;

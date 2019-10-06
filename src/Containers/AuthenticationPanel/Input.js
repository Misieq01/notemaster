import React from "react";
import styled from "styled-components";

const InputBox = styled.input`
  font-size: 22px;
  margin-left: 5px
  padding: 10px;
  outline: none;
  text-decoration: none;
  border: none;
  background: #eeeeee;
  border-radius: 3px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  opacity: 0.7;
  ::placeholder {
    color: #1c1a1a;
  }
:focus{
  opacity: 1;
}
`;

const InputWrapper = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
`;

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
`;

const Input = ({ placeholder, type, Icon, ChangeData, ...props }) => {
  return (
    <InputWrapper>
      <IconContainer>
        <Icon />
      </IconContainer>
      <InputBox
        placeholder={placeholder}
        type={type}
        onChange={event => ChangeData(event, type)}
      />
    </InputWrapper>
  );
};

export default Input;

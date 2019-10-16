import React from "react";
import styled from "styled-components";

const InputBox = styled.input`
  font-size: 22px;
  margin-left: 8px
  padding: 10px 0;
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
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  @media (min-width: 480px) {
    maring: 20px;
  }
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

import React, { useState } from "react";
import styled from "styled-components";

import firebase from "../../config/config";

import { ReactComponent as EmailIcon } from "../../SVGS/email.svg";
import { ReactComponent as PasswordIcon } from "../../SVGS/password.svg";

const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

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

const Button = styled.button`
  background: #eeeeee;
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
  width: 80%;
  height: 10%;
  padding: 5px;
  margin-top: 170px;
  font-size: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const Text = styled.p`
  font-size: ${props => props.fontSize || "19px"};
  cursor: ${props => props.cursor};
  color: ${props => props.color};
  opacity: ${props => props.opacity || 0.7}
  transition: all 0.2s ease-in-out;
  :hover{
    opacity: ${props => props.opacityHover || 0.7}
  }
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
`;

const Login = props => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({ check: false, text: "" });

  const UserLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
        switch (error.code) {
          case "auth/invalid-email":
            setError({ check: true, text: "Invalid email" });
            break;
          case "auth/user-not-found":
            setError({ check: true, text: "There is no user with this email" });
            break;
          case "auth/wrong-password":
            setError({ check: true, text: "Wrong password" });
            break;
          default:
            alert(error.message);
        }
      });
  };

  const ChangeData = (event, name) => {
    let newData = { ...data };
    newData[name] = event.target.value;
    setData(newData);
  };

  return (
    <Container>
      {error.check ? (
        <Text color="#fa6e6e" opacity={1}>
          {error.text}
        </Text>
      ) : (
        <Text>Please enter your email and password to login</Text>
      )}
      <div style={{ marginTop: "50px" }}>
        <InputWrapper>
          <Icon>
            <EmailIcon />
          </Icon>
          <InputBox
            placeholder="Email"
            type="email"
            onChange={event => ChangeData(event, "email")}
          />
        </InputWrapper>
        <InputWrapper>
          <Icon>
            <PasswordIcon />
          </Icon>
          <InputBox
            placeholder="Password"
            type="password"
            onChange={event => ChangeData(event, "password")}
          />
        </InputWrapper>
      </div>
      <Text
        fontSize="17px"
        cursor="pointer"
        opacityHover={1}
        onClick={props.Register}
      >
        Create Account
      </Text>
      <Button onClick={UserLogIn}>Login</Button>
    </Container>
  );
};
export default Login;

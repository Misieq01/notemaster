import React, { useState } from "react";
import styled from "styled-components";

import firebase from "../../config/config";

import { ReactComponent as EmailIcon } from "../../SVGS/email.svg";
import { ReactComponent as PasswordIcon } from "../../SVGS/password.svg";

const InputBox = styled.input`
  width: 80%;
  font-size: 25px;
  margin-left: 5px
  padding: 10px;
  outline: none;
  text-decoration: none;
  border: none;
  background: #5465d1;
  color: #eeeeee
  border-radius: 3px;
  display: inline-block;
  ::placeholder {
    color: #eeeeee;
  }
`;

const InputWrapper = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
`;

const Button = styled.button`
  background: #5465d1;
  border: 1px solid #5465d1;
  border-radius: 3px;
  width: 90%;
  height: 10%;
  padding: 5px;
  font-size: 25px;
  color: #eeeeee
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover{
    border: 1px solid #eeeeee;
  }
`;
const Text = styled.p`
  color: ${props => props.color || "#eeeeee"};
  font-size: 22px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-in-out;
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
    <div style={{ textAlign: "center" }}>
      {error.check ? (
        <Text color="#fa6e6e">{error.text}</Text>
      ) : (
        <Text>Please enter your email and password to login</Text>
      )}
      <InputWrapper>
        <Icon>
          <EmailIcon style={{ fill: "#eeeeee" }} />
        </Icon>
        <InputBox
          placeholder="Email"
          type="email"
          onChange={event => ChangeData(event, "email")}
        />
      </InputWrapper>
      <InputWrapper>
        <Icon>
          <PasswordIcon style={{ fill: "#eeeeee" }} />
        </Icon>
        <InputBox
          placeholder="Password"
          type="password"
          onChange={event => ChangeData(event, "password")}
        />
      </InputWrapper>
      <Button onClick={UserLogIn}>Confirm</Button>
    </div>
  );
};
export default Login;

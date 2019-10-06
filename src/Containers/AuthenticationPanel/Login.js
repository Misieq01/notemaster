import React, { useState } from "react";
import styled from "styled-components";

import firebase from "../../FireBase/config";

import Input from "./Input";

import { ReactComponent as EmailIcon } from "../../SVGS/email.svg";
import { ReactComponent as PasswordIcon } from "../../SVGS/password.svg";

const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
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
const AccountText = styled.p`
  font-size: 16px;
  cursor: pointer;
  opacity: 0.7
  transition: all 0.2s ease-in-out;
  :hover{
    opacity: 1
  }
`;

const Text = styled.p`
  color: ${props => props.color};
  font-size: 20px;
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
        <Text color="#fa6e6e">{error.text}</Text>
      ) : (
        <Text>Please enter your email and password to login</Text>
      )}
      <div style={{ marginTop: "50px" }}>
        <Input
          placeholder="Email"
          Icon={EmailIcon}
          type="email"
          ChangeData={ChangeData}
        />
        <Input
          placeholder="Password"
          Icon={PasswordIcon}
          type="password"
          ChangeData={ChangeData}
        />
      </div>
      <AccountText onClick={props.Register}>Create Account</AccountText>
      <Button onClick={UserLogIn}>Login</Button>
    </Container>
  );
};
export default Login;

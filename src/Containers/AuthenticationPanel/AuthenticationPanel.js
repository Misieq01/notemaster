import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../../config/config";
import db from '../../config/database';

const Container = styled.div`
    background: #fcfcfc;
    width: 40vw;
    height: 100vh;
    position: absolute:
    left:0;
    right:0;
    margin: auto;
    box-shadow: 0px 0px 5px #777777;
    text-align: center;
`;
const Button = styled.div`
  background: ${props => props.background || "grey"};
  color: ${props => props.color || "black"};
  width: 35%;
  hegiht: 40px;
  margin: 10px 15px 0px 15px;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
  padding: 5px;
  font-size: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;
const Input = styled.input`
  width: 90%;
  font-size: 25px;
  outline: none;
  border: none;
  text-decoration: none;
  background: #fcfcfc;
  margin: 30px;
  display: block;
`;
const Text = styled.p`
  font-size: 25px;
  text-algin: center;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 40vw;
  height: 40%;
`;

const AuthenticationPanel = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const SignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(u => {})
      .catch(error => console.log(error));
  };
  const SignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            noteData: {
              id: 0,
              notes: [],
              labels: [],
              time: Date.now()
            }
          });

      })
      .catch(error => console.log(error));
  };

  return (
    <Container>
      <Wrapper>
        <Text>Enter your email and password</Text>
        <Input
          placeholder="Email"
          value={userData.email}
          onChange={event =>
            setUserData({ ...userData, email: event.target.value })
          }
        />
        <Input
          placeholder="Password"
          type="password"
          value={userData.password}
          onChange={event =>
            setUserData({ ...userData, password: event.target.value })
          }
        />
        <Button background="#53ff4a" color="black" onClick={SignIn}>
          SignIn
        </Button>
        <Button background="#4586ff" color="white" onClick={SignUp}>
          SignUp
        </Button>
      </Wrapper>
    </Container>
  );
};

export default AuthenticationPanel;

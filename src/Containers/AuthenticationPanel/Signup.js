import React, { useState } from "react";
import firebase from "../../FireBase/config";
import db from "../../FireBase/database";
import styled from "styled-components";

import Input from "./Input";

import { ReactComponent as NameIcon } from "../../SVGS/name.svg";
import { ReactComponent as EmailIcon } from "../../SVGS/email.svg";
import { ReactComponent as PasswordIcon } from "../../SVGS/password.svg";

const Button = styled.button`
  background: #eeeeee;
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
  width: 90%;
  height: 10%;
  padding: 5px;
  margin-top: 70px;
  font-size: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const LoginText = styled.p`
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

const Signup = props => {
  const [data, setData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: ""
  });
  const [error, setError] = useState({ check: false, text: "" });

  const ChangeData = (event, name) => {
    let newData = { ...data };
    newData[name] = event.target.value;
    setData(newData);
  };

  const CreateAccount = () => {
    if (data.fName === "" && data.lName === "") {
      setError({
        check: true,
        text: "Last name and first name must be filled "
      });
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(cred => {
          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              firstName: data.fName,
              lastName: data.lName,
              email: data.email,
              notes: [],
              labels: []
            });
        })
        .catch(error => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setError({ check: true, text: "Email already in use" });
              break;
            case "auth/invalid-email":
              setError({ check: true, text: "Invalid email" });
              break;
            default:
              alert(error.message);
          }
        });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {error.check ? (
        <Text color="#fa6e6e">{error.text}</Text>
      ) : (
        <Text>Fill required data to signup</Text>
      )}
      <Input
        placeholder="FirstName"
        Icon={NameIcon}
        type="fName"
        ChangeData={ChangeData}
      />
      <Input
        placeholder="LastName"
        Icon={NameIcon}
        type="lName"
        ChangeData={ChangeData}
      />
      <Input
        placeholder="Email"
        Icon={EmailIcon}
        type="email"
        ChangeData={ChangeData}
      />
      <Input
        placeholder="Paswword"
        Icon={PasswordIcon}
        type="password"
        ChangeData={ChangeData}
      />
      <LoginText onClick={props.Login}>Back to login</LoginText>
      <Button onClick={CreateAccount}>SignUp</Button>
    </div>
  );
};
export default Signup;

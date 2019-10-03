import React, { useState } from "react";
import firebase from "../../config/config";
import db from "../../config/database";
import styled from "styled-components";

import { ReactComponent as NameIcon } from "../../SVGS/name.svg";
import { ReactComponent as EmailIcon } from "../../SVGS/email.svg";
import { ReactComponent as PasswordIcon } from "../../SVGS/password.svg";

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
const Text = styled.p`
  font-size: ${props => props.fontSize || "19px"};
  cursor: ${props => props.cursor};
  color: ${props => props.color};
  opacity: ${props => props.opacity || 0.7}
  transition: all 0.2s ease-in-out;
  :hover {
    opacity: ${props => props.opacityHover || 0.7};
  }
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
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
        <Text color="#fa6e6e" opacity={1}>
          {error.text}
        </Text>
      ) : (
        <Text>Fill required data to signup</Text>
      )}
      <InputWrapper>
        <Icon>
          <NameIcon />
        </Icon>
        <InputBox
          placeholder="FirsName"
          onChange={event => ChangeData(event, "fName")}
        />
      </InputWrapper>
      <InputWrapper>
        <Icon>
          <NameIcon />
        </Icon>
        <InputBox
          placeholder="LastName"
          onChange={event => ChangeData(event, "lName")}
        />
      </InputWrapper>
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
      <Text
        fontSize="16px"
        cursor="pointer"
        opacityHover={1}
        onClick={props.Login}
      >
        Back to login
      </Text>
      <Button onClick={CreateAccount}>SignUp</Button>
    </div>
  );
};
export default Signup;

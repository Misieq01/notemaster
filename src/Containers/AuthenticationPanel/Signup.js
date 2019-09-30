import React, { useState } from "react";
import firebase from "../../config/config";
import db from "../../config/database";
import styled from "styled-components";

import { ReactComponent as NameIcon } from "../../SVGS/name.svg";
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
      <InputWrapper>
        <Icon>
          <NameIcon style={{ fill: "#eeeeee" }} />
        </Icon>
        <InputBox
          placeholder="FirsName"
          onChange={event => ChangeData(event, "fName")}
        />
      </InputWrapper>
      <InputWrapper>
        <Icon>
          <NameIcon style={{ fill: "#eeeeee" }} />
        </Icon>
        <InputBox
          placeholder="LastName"
          onChange={event => ChangeData(event, "lName")}
        />
      </InputWrapper>
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
      <Button onClick={CreateAccount}>SignUp</Button>
    </div>
  );
};
export default Signup;

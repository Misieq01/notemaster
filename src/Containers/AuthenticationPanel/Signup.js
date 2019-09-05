import React, { useState } from "react";
import firebase from "../../config/config";
import db from "../../config/database";
import styled from "styled-components";

const Signup = props => {
  const [data, setData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: ""
  });

  const ChangeData = (event, name) => {
    let newData = { ...data };
    newData[name] = event.target.value;
    setData(newData);
  };

  const CreateAccount = () => {
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
      });
  };

  return (
    <div>
      <p></p>
      <input
        placeholder="FirsName"
        onChange={event => ChangeData(event, "fName")}
      />
      <input
        placeholder="LastName"
        onChange={event => ChangeData(event, "lName")}
      />
      <input
        placeholder="Email"
        type="email"
        onChange={event => ChangeData(event, "email")}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={event => ChangeData(event, "password")}
      />
      <button onClick={CreateAccount}>SignUp</button>
    </div>
  );
};
export default Signup;

import React, { useState } from "react";
import styled from "styled-components";

import firebase from "../../config/config";

const Login = props => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const UserLogIn = () => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password);
  };

  const ChangeData = (event, name) => {
    let newData = { ...data };
    newData[name] = event.target.value;
    setData(newData);
  };

  return (
    <div>
      <p>Please enter your email and password to move on</p>
      <input
        placeholder="email"
        type="email"
        onChange={event => ChangeData(event, "email")}
      />
      <input
        placeholder="password"
        type="password"
        onChange={event => ChangeData(event, "password")}
      />
      <button onClick={UserLogIn}>Confirm</button>
    </div>
  );
};
export default Login;

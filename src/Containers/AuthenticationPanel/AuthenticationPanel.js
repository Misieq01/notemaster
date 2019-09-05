import React, { useState } from "react";
import styled from "styled-components";

import Login from "./Login";
import Signup from "./Signup";

const Button = styled.button``;

const AuthenticationPanlel = props => {
  const [mode, setMode] = useState("none");

  return (
    <div>
      {mode === "none" ? (
        <div>
          <p>
            Hi ! If this is your first time in this wonderful application please
            create account, if not, just login ;){" "}
          </p>
          <Button onClick={() => setMode("login")}>Login</Button>
          <Button onClick={() => setMode("signup")}>Create Account</Button>
        </div>
      ) : null}
      {mode === "login" ? <Login clean={() => setMode("none")} /> : null}
      {mode === "signup" ? <Signup clean={() => setMode("none")} /> : null}
    </div>
  );
};
export default AuthenticationPanlel;

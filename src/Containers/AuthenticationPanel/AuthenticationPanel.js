import React, { useState } from "react";
import styled from "styled-components";

import Login from "./Login";
import Signup from "./Signup";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const InputPanel = styled.div`
  background: #eeeeee;
  width: 420px;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.h1`
  margin: 0;
  padding:0;
  font-size: 90px;
  line-height: 200px
  font-family:Amatic SC;
  cursor: default;
  opacity: 0.9;
`;

const AuthenticationPanlel = () => {
  const [mode, setMode] = useState("login");

  return (
    <Container>
      <Title>Note Master</Title>
      {mode === "login" ? (
        <InputPanel>
          <Login Register={() => setMode("signup")} />
        </InputPanel>
      ) : null}
      {mode === "signup" ? (
        <InputPanel>
          <Signup Login={() => setMode("login")} />
        </InputPanel>
      ) : null}
    </Container>
  );
};
export default AuthenticationPanlel;

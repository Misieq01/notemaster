import React, { useState } from "react";
import styled from "styled-components";

import Login from "./Login";
import Signup from "./Signup";

import { ReactComponent as LoginIlustration } from "../../SVGS/Ilustrations/login.svg";
import { ReactComponent as SignupIlustration } from "../../SVGS/Ilustrations/signup.svg";
import { ReactComponent as BackArrowIcon } from "../../SVGS/back-arrow.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const TitleContainer = styled.div`
  height: 50%;
  width: 100%;
  background: #ffc929;
  text-align: center;
  line:height: 25%;
`;
const InputPanel = styled.div`
  position: absolute;
  top:200px;
  right:0;
  bottom:0;
  left:0;
  margin: auto;
  background: #5465d1;
  width: 25%;
  height: 50%
  border-radius: 8px;
  box-shadow: 0px 1px 10px #999999;
`;
const ActionPanel = styled.div`
  position: absolute;
  top: 200px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80vw;
  height: 60vh;
`;
const ActionPanelWrapper = styled.div`
  display: inline-block;
  width: 40%;
  height: 90%;
  margin: 0 5% 5% 5%;
`;
const Ilustration = styled.div`
  width: 90%;
  height: 70%;
  margin: 5%;
`;

const Title = styled.h1`
  margin: 0;
  padding:0;
  font-size: 80px;
  line-height: 200px
  color: #eeeeee;
  font-family:Satisfy
  cursor: default;
`;

const Button = styled.button`
  background: #ffc929;
  border: 4px solid #ffc929;
  border-radius: 3px;
  width: 30vw;
  height: 10vh;
  font-size: 30px;
  color: #eeeeee
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    background: #eeeeee;
    color: #ffc929;
  }
`;

const BackIcon = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;
  margin: 5px;
`;

const AuthenticationPanlel = props => {
  const [mode, setMode] = useState("none");

  return (
    <Container>
      <TitleContainer>
        <Title>Note Master</Title>
      </TitleContainer>
      {mode === "none" ? (
        <ActionPanel>
          <ActionPanelWrapper>
            <Ilustration>
              <LoginIlustration />
            </Ilustration>
            <Button onClick={() => setMode("login")}>Login</Button>
          </ActionPanelWrapper>
          <ActionPanelWrapper>
            <Ilustration>
              <SignupIlustration />
            </Ilustration>
            <Button onClick={() => setMode("signup")}>Create Account</Button>
          </ActionPanelWrapper>
        </ActionPanel>
      ) : null}
      {mode === "login" ? (
        <InputPanel>
          <Login />
          <BackIcon onClick={() => setMode("none")}>
            <BackArrowIcon style={{ fill: "#eeeeee" }} />
          </BackIcon>
        </InputPanel>
      ) : null}
      {mode === "signup" ? (
        <InputPanel>
          <Signup />
          <BackIcon onClick={() => setMode("none")}>
            <BackArrowIcon style={{ fill: "#eeeeee" }} />
          </BackIcon>
        </InputPanel>
      ) : null}
    </Container>
  );
};
export default AuthenticationPanlel;

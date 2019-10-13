import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

const Text = styled(TextArea)`
  font-size: 20px;
  font-family: Roboto;
  background: ${props => props.background || "#eeeeee"};
  opacity: 0.75;
  padding: 1% 4% 1% 4%;
  width: 92%;
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;

const NoteEditor = ({ color, content, GetContent, BoxShadow }) => {
  const textRef = useRef();

  useEffect(() => {
    textRef.current.scroll({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <Text
      minRows={1}
      maxRows={20}
      lineHeight={30}
      placeholder="Place for your thoughts"
      onChange={event => GetContent(event.target.value)}
      value={content}
      background={color}
      onScroll={BoxShadow}
      textRef={textRef}
    />
  );
};

export default NoteEditor;

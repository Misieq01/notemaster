import React, { useEffect, useRef, useMemo } from "react";
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
  const HEIGHT = window.innerHeight;
  const textRef = useRef();

  useEffect(() => {
    textRef.current.scroll({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const MaxRows = useMemo(() => {
    const ROW_HEIGHT = 30;
    let rows = 0;

    for (let i = 0; i < HEIGHT - 180; i += ROW_HEIGHT) {
      rows++;
    }

    rows = rows > 20 ? 20 : rows;

    return rows;
  }, [HEIGHT]);

  return (
    <Text
      minRows={1}
      maxRows={MaxRows}
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

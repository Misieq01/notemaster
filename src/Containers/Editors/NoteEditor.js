import React from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

const Text = styled(TextArea)`
  font-size: 25px;
  background: ${props => props.background || "#eeeeee"};
  opacity: 0.75;
  padding: 4% 4% 1% 4%;
  width: 92%;
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;

const NoteEditor = ({ color, content, GetContent }) => {
  return (
    <Text
      minRows={1}
      maxRows={20}
      lineHeight={30}
      placeholder="Place for your thoughts"
      onChange={event => GetContent(event.target.value)}
      value={content}
      background={color}
    />
  );
};

export default NoteEditor;

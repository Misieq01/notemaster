import React from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

const Title = styled.input`
  width: 100%;
  font-size: 30px;
  line-height: 30px;
  border: none;
  outline: none;
  text-decoration: none;
  background: "#eeeeee";
  border-radius: 8px 8px 0px 0px;
`;
const Text = styled(TextArea)`
  font-size: 25px;
`;

const NoteEditor = props => {
  console.log(props.twoWayBinding);

  return (
    <div>
      <Title
        placeholder="Title"
        onChange={event => props.getValue(event, "title")}
        value={props.twoWayBinding.title}
      />
      <Text
        minRows={1}
        maxRows={20}
        lineHeight={30}
        placeholder="Place for your thoughts"
        change={event => props.getValue(event, "content")}
        value={props.twoWayBinding.content}
      />
    </div>
  );
};

export default NoteEditor;

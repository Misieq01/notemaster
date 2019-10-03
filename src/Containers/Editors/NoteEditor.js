import React from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

const Title = styled.input`
  width: 92%;
  font-size: 30px;
  line-height: 30px;
  opacity: 0.8;
  padding: 4% 4% 0 4%;
  border: none;
  outline: none;
  text-decoration: none;
  background: ${props => props.background || "#eeeeee"};
  border-radius: 8px 8px 0px 0px;
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;
const Text = styled(TextArea)`
  font-size: 25px;
  background: ${props => props.background || "#eeeeee"};
  opacity: 0.75;
  padding: 4% 4% 2% 4%;
  width: 92%;
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;

const Label = styled.div`
  font-size: 15px;
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: #eeeeee;
  cursor: default;
`;

const NoteEditor = props => {
  return (
    <div>
      <Title
        placeholder="Title"
        onChange={event => props.getValue(event, "title")}
        value={props.twoWayBinding.title}
        background={props.color}
      />
      <Text
        minRows={1}
        maxRows={20}
        lineHeight={30}
        placeholder="Place for your thoughts"
        onChange={event => props.getValue(event, "content")}
        value={props.twoWayBinding.content}
        background={props.color}
      />
      <div>
        {props.labels.map((label, index) => {
          return <Label key={index}>{label}</Label>;
        })}
      </div>
    </div>
  );
};

export default NoteEditor;

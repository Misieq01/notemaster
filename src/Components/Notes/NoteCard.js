import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 240px;
  background: ${props => props.color};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  text-align: center;
`;
const Title = styled.h2`
    width:90%;
    height: 10%
    padding: 10px;
    margin:0;
    font-size: 18px;
    text-transform: uppercase;
    text-align: left;
    opacity: 0.95;
`;
const Text = styled.p`
    width:90%
    opacity: 0.75;
    padding: 3px;
    margin:0;
    text-align: justify;
    display:inline-block;
    font-size: 15px;
`;

const Label = styled.div`
  font-size: 12px;
  padding: 2px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: #eeeeee;
`;

const NoteCard = props => {
  const NoteTruncate = text => {
    if (text.length > 430) {
      let newText = text.substring(0, 430);
      if (newText.lastIndexOf(" ") > 0) {
        newText = newText.substring(
          0,
          Math.min(newText.length, newText.lastIndexOf(" "))
        );
      }

      newText = newText.concat(" {...}");

      return newText;
    }
    return text;
  };
  const LabelsTruncate = labels => {
    let length = 0;
    let newLabels = [...labels];
    for (let i = 0; i < newLabels.length; i++) {
      length += newLabels[i].length;
      if (length > 40) {
        newLabels.splice(i, newLabels.length);
      }
    }
    let renderedLabels = newLabels.map((label, index) => {
      return <Label key={index}>{label}</Label>;
    });
    return renderedLabels;
  };

  const text = NoteTruncate(props.content);
  const labels = LabelsTruncate(props.labels);

  return (
    <Container
      onClick={() => props.Click("note", props.id, props.color)}
      color={props.color}
    >
      <Title>{props.title}</Title>
      <Text>{text}</Text>
      {labels}
    </Container>
  );
};

export default NoteCard;

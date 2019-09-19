import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 240px;
  max-height: 360px;
  background: ${props => props.color};
  box-shadow: 0px 1px 5px grey;
  border-radius: 3px;
  margin: 10px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  text-align: center;
`;
const Title = styled.h2`
    width:90%;
    height: 10%
    padding: 10px;
    margin:0;
`;
const Text = styled.p`
    width:90%
    hegiht: 70%
    padding: 5px;
    margin:0;
    text-align: justify;
    display:inline-block;
    font-size: 15px;
`;

const Label = styled.div`
  font-size: 18px;
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
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

  const text = NoteTruncate(props.text);
  console.log(props.labels);

  return (
    <Container
      onClick={() => props.click("note", props.id, props.color)}
      color={props.color}
    >
      <Title>{props.title}</Title>
      <Text>{text}</Text>
      {props.labels.map((label, index) => {
        return <Label key={index}>{label}</Label>;
      })}
    </Container>
  );
};

export default NoteCard;

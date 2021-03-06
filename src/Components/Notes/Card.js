import React, { useMemo } from "react";
import styled from "styled-components";

import List from "./List";
import Note from "./Note";

const Container = styled.div`
  width: 240px;
  background: ${props => props.color};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  padding: 12px 12px 6px 12px;
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

const Label = styled.div`
  font-size: 12px;
  padding: 2px;
  margin: 5px 3px
  border-radius: 5px;
  display: inline-block;
  background:none;
  border: 1px solid rgba(0,0,0,0.5);
`;

const Card = ({ labels, type, title, color, id, content, ...props }) => {
  const MAX_LABELS_LENGTH = 4;
  const MAX_LABELS_TEXT_LENGTH = 12;

  const TruncateText = (t, len) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

  const TruncatedLabels = useMemo(() => {
    return [...labels]
      .slice(0, MAX_LABELS_LENGTH)
      .map(e => (
        <Label key={e}>{TruncateText(e, MAX_LABELS_TEXT_LENGTH)}</Label>
      ));
  }, [labels]);

  const Content =
    type === "note" ? (
      <Note content={content} />
    ) : (
      <List content={content} color={color} />
    );

  return (
    <Container onClick={() => props.Click(type, id, color)} color={color}>
      <Title>{title}</Title>
      {Content}
      {TruncatedLabels}
    </Container>
  );
};

export default Card;

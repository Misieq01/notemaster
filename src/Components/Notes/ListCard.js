import React, { useMemo } from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";
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
    padding: 10px 0;
    margin:0;
    font-size: 18px;
    text-transform: uppercase;
    text-align: left;
    opacity: 0.95;
`;

const Label = styled.div`
  font-size: 12px;
  padding: 2px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: #eeeeee;
`;
const List = styled.div`
  text-align: left;
`;
const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ListElement = styled.div`
    width: '96%'
    min-height: 30px;
    padding: 2%;
    resize:none;
    border:none;
    text-decoration:none;
    outline:none;
    font-size: 15px;
    background: ${props => props.background || "white"};
    cursor: pointer
    opacity: 0.75;
`;

const Icon = styled.div`
  width: 15px;
  height: auto;
  display: inline-block;
  margin-left: 5px;
`;

const MAX_PARENT_LEN = 5;
const MAX_CHILD_LEN = 3;
const MAX_TEXT_LEN = 90;

const ListCard = ({ content, color, id, title, ...props }) => {
  const list = [...content];
  const labels = [...props.labels];

  const truncateText = (t, len = MAX_TEXT_LEN) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

  const truncList = useMemo(() => {
    return [...list].slice(0, MAX_PARENT_LEN).map(e => {
      let name = [...e.name];
      let childs = [...e.childs]
        .splice(0, MAX_CHILD_LEN)
        .map(x => ({ id: x.id, name: truncateText(x.name) }));
      name = truncateText(e.name, 40);

      return (
        <div key={e.id}>
          <ListItemWrapper>
            <Icon>
              <BoxIcon />
            </Icon>
            <ListElement background={color}>{name}</ListElement>
          </ListItemWrapper>
          <div style={{ marginLeft: "20px" }}>
            {childs.map(c => {
              return (
                <ListItemWrapper key={c.id}>
                  <Icon>
                    <BoxIcon />
                  </Icon>
                  <ListElement background={color}>{c.name}</ListElement>
                </ListItemWrapper>
              );
            })}
          </div>
        </div>
      );
    });
  }, [list, color]);

  const truncLabels = useMemo(
    () => labels.map((e, i) => <Label key={i}>{truncateText(e, 40)}</Label>),
    [labels]
  );

  return (
    <Container onClick={() => props.Click("list", id, color)} color={color}>
      <Title>{title}</Title>

      <List>{truncList}</List>

      {truncLabels}
    </Container>
  );
};

export default ListCard;

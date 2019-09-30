import React from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";

const Container = styled.div`
  width: 240px;
  max-height: 385px;
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
`;

const Icon = styled.div`
  width: 15px;
  height: auto;
  display: inline-block;
  margin-left: 5px;
`;

const Label = styled.div`
  font-size: 12px;
  padding: 2px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: #eeeeee;
`;

const ListCard = props => {
  const ListTruncate = () => {
    let newList = [...props.content];
    let textLength = 0;
    let elementsCounter = 0;

    for (let i = 0; i < newList.length; i++) {
      elementsCounter += 1;
      textLength += newList[i].name.length;
      if (elementsCounter >= 10 || textLength >= 230) {
        return newList.splice(0, i);
      } else {
        for (let j = 0; j < newList[i].childs.length; j++) {
          elementsCounter += 1;
          textLength += newList[i].childs[j].name;
          if (elementsCounter >= 10 || textLength >= 230) {
            return newList.splice(0, i);
          }
        }
      }
    }
    return newList;
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

  const truncatedList = ListTruncate();

  const list = truncatedList.map((parent, index) => {
    return (
      <div key={parent.id}>
        <ListItemWrapper>
          <Icon>
            <BoxIcon />
          </Icon>
          <ListElement background={props.color}>{parent.name}</ListElement>
        </ListItemWrapper>
        <div style={{ marginLeft: "20px" }}>
          {parent.childs.map((child, childIndex) => {
            return (
              <ListItemWrapper key={child.id}>
                <Icon>
                  <BoxIcon />
                </Icon>
                <ListElement background={props.color}>{child.name}</ListElement>
              </ListItemWrapper>
            );
          })}
        </div>
      </div>
    );
  });
  const labels = LabelsTruncate(props.labels);

  return (
    <Container
      onClick={() => props.Click("list", props.id, props.color)}
      color={props.color}
    >
      <Title>{props.title}</Title>
      <List>{list}</List>
      {labels}
    </Container>
  );
};

export default ListCard;

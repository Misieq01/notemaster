import React from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";

const Container = styled.div`
  width: 240px;
  max-height: 450px;
  background: ${props => props.color};
  box-shadow: 0px 2px 6px #595959;
  border-radius: 3px;
  margin: 10px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
  text-align: center;
`;
const Title = styled.h2`
    width:90%;
    height: 10%
    padding: 10px;
    margin:0;
    font-size: 18px;
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
  // This fucking shit has to be reworked
  // Funny thing: If you try to slice child list it will mute redux state
  // And if you slice in parent it will work without some fucking mutating
  // And the funniest thing is that this shit has no acces to update redux state
  // So i don't have fucking idea how it is possible
  const ListTruncate = oldList => {
    let list = [...oldList];
    let textLength = 0;
    let elementsCounter = 0;

    for (let i = 0; i < list.length; i++) {
      elementsCounter += 1;
      textLength += list[i].name.length;
      if (elementsCounter >= 10 || textLength >= 300) {
        return list.slice(0, i);
      }
      for (let j = 0; j < list[i].childs.length; j++) {
        elementsCounter += 1;
        textLength += list[i].childs[j].name;
        if (elementsCounter >= 10 || textLength >= 300) {
          list[i].childs = list[i].childs.slice(0, j);
          return list;
        }
      }
    }

    return list;
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

  let truncatedList = ListTruncate(props.content);

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

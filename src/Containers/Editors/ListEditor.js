import React, { useState } from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";
import { ReactComponent as FiledBoxIcon } from "../../SVGS/filled_box.svg";

const Title = styled.input`
  width: 100%;
  font-size: 30px;
  line-height: 30px;
  border: none;
  outline: none;
  text-decoration: none;
  background: ${props => props.background};
  border-radius: 8px 8px 0px 0px;
`;
const ListElementText = styled(TextArea)`
  font-size: 25px;
  background: ${props => props.background};
`;
const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NewListElement = styled.div`
    width: '96%'
    min-height: 30px;
    padding: 2%;
    resize:none;
    border:none;
    text-decoration:none;
    outline:none;
    font-size: 23px;
    background: ${props => props.background || "white"};
    line-height: 30px;
    cursor: pointer
`;
const List = styled.div``;

const Label = styled.div`
  font-size: 15px;
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: #eeeeee;
  cursor: default;
`;

const Icon = styled.div`
  width: 15px;
  height: auto;
  display: inline-block;
  margin-left: 5px;
`;

const ListEditor = props => {
  const AddNewListElement = (isChild, id) => {
    let newList = [...props.data.content];
    if (!isChild) {
      newList.push({
        id: newList[newList.length - 1].id + 1,
        name: "",
        childs: []
      });
      props.GetList(newList);
    } else if (isChild) {
      if (newList[id].childs.length === 0) {
        newList[id].childs.push({ id: 0, name: "" });
        props.GetList(newList);
      } else {
        newList[id].childs.push({
          id: newList[id].childs[newList[id].childs.length - 1].id + 1,
          name: ""
        });
        props.GetList(newList);
      }
    }
  };

  const KeyUpHandler = (event, parentId, childId, isChild) => {
    let newList = [...props.data.content];

    // Deleting and changing parents list elements
    if (!isChild) {
      if (
        event.keyCode === 8 &&
        newList[parentId].name === "" &&
        newList.length > 1
      ) {
        newList = [
          ...newList.slice(0, parentId),
          ...newList.slice(parentId + 1)
        ];
        props.GetList(newList);
      } else {
        newList[parentId].name = event.target.value;
        props.GetList(newList);
      }
    } // Deleting and changing child list elements
    else if (isChild) {
      if (
        event.keyCode === 8 &&
        newList[parentId].childs[childId].name === ""
      ) {
        newList[parentId].childs = [
          ...newList[parentId].childs.slice(0, childId),
          ...newList[parentId].childs.slice(childId + 1)
        ];
        props.GetList(newList);
      } else {
        newList[parentId].childs[childId].name = event.target.value;
        props.GetList(newList);
      }
    }
  };

  console.log(props.data.content);

  return (
    <div style={{ textAlign: "left" }}>
      <Title
        placeholder="Title"
        onChange={event => props.GetValue(event, "title")}
        value={props.data.title}
        background={props.color}
      />
      <List>
        {props.data.content.map((parent, index) => {
          return (
            <div key={parent.id}>
              <ListItemWrapper>
                <Icon>
                  <FiledBoxIcon />
                </Icon>
                <ListElementText
                  minRows={1}
                  maxRows={4}
                  lineHeight={30}
                  placeholder="Write your thoughts..."
                  background={props.color}
                  value={parent.name}
                  onKeyUp={event => KeyUpHandler(event, index, null, false)}
                  onChange={() => console.log()}
                />
              </ListItemWrapper>
              <div style={{ marginLeft: "10px" }}>
                {parent.childs.map((child, childIndex) => {
                  return (
                    <ListItemWrapper key={child.id}>
                      <Icon>
                        <BoxIcon />
                      </Icon>
                      <ListElementText
                        minRows={1}
                        maxRows={4}
                        lineHeight={30}
                        placeholder="Write your thoughts..."
                        background={props.color}
                        value={child.name}
                        onKeyUp={event =>
                          KeyUpHandler(event, index, childIndex, true)
                        }
                        onChange={() => console.log()}
                      />
                    </ListItemWrapper>
                  );
                })}
                <NewListElement
                  background={props.color}
                  onClick={() => AddNewListElement(true, parent.id)}
                >
                  Add sub list element
                </NewListElement>
              </div>
            </div>
          );
        })}
        <NewListElement
          background={props.color}
          onClick={() => AddNewListElement(false, null)}
        >
          Add list element
        </NewListElement>
      </List>
      {props.labels.map((label, index) => {
        return <Label key={index}>{label}</Label>;
      })}
    </div>
  );
};

export default ListEditor;

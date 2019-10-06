import React from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";

const ListElementText = styled(TextArea)`
  font-size: 25px;
  background: ${props => props.background};
  opacity: 0.75;
  transition: all 0.2s ease-in-out;
  :focus {
    opacity: 1;
  }
`;
const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NewListElement = styled.div`
    width: '96%'
    min-height: 30px;
    opacity: 0.75;
    padding: 2%;
    resize:none;
    border:none;
    text-decoration:none;
    outline:none;
    font-size: 23px;
    background: ${props => props.background || "#eeeeee"};
    line-height: 30px;
    cursor: pointer
`;
const List = styled.div`
  padding: 2% 2% 1% 2%;
`;

const Icon = styled.div`
  width: 15px;
  height: auto;
  display: inline-block;
  margin-left: 5px;
`;

const ListEditor = ({ content, color, GetContent, ...props }) => {
  const AddNewListElement = (isChild, id) => {
    const newList = [...content];
    if (!isChild) {
      newList.push({
        id: newList[newList.length - 1].id + 1,
        name: "",
        childs: []
      });
    } else if (isChild) {
      const element = newList[id].childs;
      if (element.length === 0) {
        element.push({ id: 0, name: "" });
      } else {
        element.push({
          id: element[element.length - 1].id + 1,
          name: ""
        });
      }
    }
    GetContent(newList);
  };

  const KeyUpHandler = (event, parentId, childId, isChild) => {
    let newList = [...content];
    const element = newList[parentId];

    // Deleting and changing parents list elements
    if (!isChild) {
      if (event.keyCode === 8 && element.name === "" && newList.length > 1) {
        newList = [
          ...newList.slice(0, parentId),
          ...newList.slice(parentId + 1)
        ];
      } else {
        element.name = event.target.value;
      }
    } // Deleting and changing child list elements
    else if (isChild) {
      if (event.keyCode === 8 && element.childs[childId].name === "") {
        element.childs = [
          ...element.childs.slice(0, childId),
          ...element.childs.slice(childId + 1)
        ];
      } else {
        element.childs[childId].name = event.target.value;
      }
    }
    GetContent(newList);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <List>
        {content.map((parent, index) => {
          return (
            <div key={parent.id}>
              <ListItemWrapper>
                <Icon>
                  <BoxIcon />
                </Icon>
                <ListElementText
                  minRows={1}
                  maxRows={4}
                  lineHeight={30}
                  placeholder="Write your thoughts..."
                  background={color}
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
                        background={color}
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
                  background={color}
                  onClick={() => AddNewListElement(true, parent.id)}
                >
                  Add sub list element
                </NewListElement>
              </div>
            </div>
          );
        })}
        <NewListElement
          background={color}
          onClick={() => AddNewListElement(false, null)}
        >
          Add list element
        </NewListElement>
      </List>
    </div>
  );
};

export default ListEditor;

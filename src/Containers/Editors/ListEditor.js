import React from "react";
import styled from "styled-components";

import TextArea from "../../Components/ResizableTextArea";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";

const Container = styled.div`
  max-height: 600px
  overflow: auto;
  text-align: left;
    ::-webkit-scrollbar {
    width: 10px;
    cursor: default;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;

const ListElementText = styled(TextArea)`
  font-size: 25px;
  font-family: Roboto;
  background: ${props => props.background};
  color: rgba(0, 0, 0, 0.7);
  transition: all 0.2s ease-in-out;
  :focus {
    color: rgba(0, 0, 0, 1);
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
    padding: 2%;
    resize:none;
    border:none;
    text-decoration:none;
    outline:none;
    font-size: 23px;
    background: ${props => props.background || "#eeeeee"};
    color: rgba(0,0,0,0.8);
    line-height: 30px;
    cursor: pointer
`;
const List = styled.div`
  padding: 1% 2% 1% 2%;
`;

const Icon = styled.div`
  width: 15px;
  height: auto;
  display: inline-block;
  margin-left: 5px;
`;

const ListEditor = ({ content, color, GetContent, BoxShadow, ...props }) => {
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
    <Container onScroll={event => BoxShadow(event.target.scrollTop)}>
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
    </Container>
  );
};

export default ListEditor;

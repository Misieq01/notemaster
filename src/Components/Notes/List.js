import React, { useMemo } from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../SVGS/box.svg";

const ListContainer = styled.div`
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
const MAX_TEXT_LENGTH = 90;

const List = ({ content, color, ...props }) => {
  const list = [...content];

  const WordTruncate = (t, len = MAX_TEXT_LENGTH) => {
    if (t.length > len)
      t =
        t.slice(0, len).substring(0, Math.min(t.length, t.lastIndexOf(" "))) +
        "...";
    return t;
  };

  const TruncatedList = useMemo(() => {
    return [...list].slice(0, MAX_PARENT_LEN).map(e => {
      let name = [...e.name];
      let childs = [...e.childs]
        .splice(0, MAX_CHILD_LEN)
        .map(x => ({ id: x.id, name: WordTruncate(x.name) }));
      name = WordTruncate(e.name, 40);

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

  return <ListContainer>{TruncatedList}</ListContainer>;
};

export default List;

import React, { useState } from "react";
import styled from 'styled-components';

const WrittingArea = styled.textarea`
  ::-webkit-scrollbar {
    width: 10px;
    cursor: default;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #cccccc;
  };
`;

const ResizableTextArea = props => {
  const [data, setData] = useState({
    minRows: props.minRows,
    maxRows: props.maxRows,
    value: props.value,
    rows: props.minRows,
  });


  const HandleChange = event => {

    props.GetInputData(event,'text')

    const lineHeight = props.lineHeight;
    const minRows = data.minRows;
    const maxRows = data.maxRows;

    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setData({
      ...data,
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  return (
    <WrittingArea
      autoFocus={true}
      className={props.className}
      value={data.value}
      rows={data.rows}
      placeholder={props.placeholder}
      onChange={event => HandleChange(event)}
      onFocus={event => HandleChange(event)}
      
    />
  );
};

export default ResizableTextArea;

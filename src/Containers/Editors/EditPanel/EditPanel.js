import React, { useState } from "react";
import styled from "styled-components";

import ColorPicker from "./ColorPicker";
import AddLabel from "./AddLabel";
import Portal from "../../../Components/Portal";

import { ReactComponent as DeleteIcon } from "../../../SVGS/EditPanel/delete.svg";
import { ReactComponent as CopyIcon } from "../../../SVGS/EditPanel/copy.svg";
import { ReactComponent as ColorIcon } from "../../../SVGS/EditPanel/color.svg";
import { ReactComponent as LabelIcon } from "../../../SVGS/EditPanel/label.svg";

const Container = styled.div`
  width: 40%;
  height: 100%;
  background: none;
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 640px) {
    width: 30%;
    justify-content: space-around;
  }
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  transition: all 155ms ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
  opacity: 0.75;
`;

const EditPanel = ({ editorRef, Delete, Copy }) => {
  const [colorDisplay, setColorDisplay] = useState(false);
  const [labelDisplay, setLabelDisplay] = useState(false);

  const ColorPanel = colorDisplay ? (
    <Portal
      DOMevent={editorRef.current}
      setState={() => setColorDisplay(false)}
    >
      <ColorPicker
        Close={() => setColorDisplay(false)}
        pos={editorRef.current}
      />
    </Portal>
  ) : null;

  const LabelPanel = labelDisplay ? (
    <Portal
      DOMevent={editorRef.current}
      setState={() => setLabelDisplay(false)}
    >
      <AddLabel pos={editorRef.current} />
    </Portal>
  ) : null;

  return (
    <Container>
      <Icon>
        <LabelIcon
          onClick={() => setLabelDisplay(true)}
          title="Change Labels"
        />
      </Icon>
      {LabelPanel}
      <Icon>
        <ColorIcon onClick={() => setColorDisplay(true)} title="Change Color" />
      </Icon>
      {ColorPanel}
      <Icon>
        <DeleteIcon onClick={Delete} title="Delete Note" />
      </Icon>
      <Icon>
        <CopyIcon onClick={Copy} title="Copy Note" />
      </Icon>
    </Container>
  );
};

export default EditPanel;

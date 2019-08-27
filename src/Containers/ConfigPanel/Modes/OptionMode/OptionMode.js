import React, { useState } from "react";
import styled from "styled-components";

import NoteTypeSelectionPanel from "./NoteSelectionPanel";

////////////  CSS  ////////////////////////////

const Container = styled.div`
  height: 100vh;
  width: 3%;
  background: #eeeeee;
  float: right;
  text-align: center;
  border-left: 2px solid #4a89ff;
`;

const Icon = styled.span`
  font-size: 40px;
  text-align: center;
  color: #333634;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.3);
  }
`;

///////////////////////////////////////////////

const OptionMode = props => {
  const [
    displayNoteTypeSelectionPanel,
    setDislpayNoteSelectionPanel
  ] = useState(false);

  return (
    <Container>
      <Icon title="Add Note" onClick={() => setDislpayNoteSelectionPanel(true)}>
        &#43;
      </Icon>
      {displayNoteTypeSelectionPanel ? (
        <NoteTypeSelectionPanel
          close={() => setDislpayNoteSelectionPanel(false)}
        />
      ) : null}
    </Container>
  );
};

export default OptionMode;

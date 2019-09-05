import React, { useState } from "react";
import styled from "styled-components";

import OptionPanel from "./OptionPanel/OptionPanel";
import EditPanel from "./EditPanel";

const ConfigPanel = props => {
  const [option, setOption] = useState(true);

  return <div>{option ? <OptionPanel /> : <EditPanel />}</div>;
};

export default ConfigPanel;

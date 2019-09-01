import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Store } from "@sambego/storybook-state";

import ResizableTextArea from "../src/Components/ResizableTextArea";

const store = new Store({
  value: ""
});

storiesOf("ResizableTextArea", module).add("default", () => (
  <ResizableTextArea
    onClick={action("clicked")}
    lineHeight={30}
    placeholder="Example"
    minRows={1}
    color="#99CC66"
    maxRows={20}
    value={store.get("value")}
    GetInputData={e => store.set("value", e)}
  />
));

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
    placeholder="Example"
    lineHeight={30}
    minRows={1}
    maxRows={10}
    value={store.get("value")}
    GetInputData={e => store.set("value", e)}
    background={"#eeeeee"}
  />
));

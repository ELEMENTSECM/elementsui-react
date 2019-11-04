import * as React from "react";
import styled from "styled-components";
import { StoryFn } from "@storybook/addons";

const Pad = styled.div`padding: 100px;`;
export const padDecorator = (storyFn: StoryFn<any>) => <Pad>{storyFn()}</Pad>;

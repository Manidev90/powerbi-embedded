import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown } from "react-bootstrap";
import DropdownToggle from "../DropdownToggle";

export default {
  title: "components/DropdownToggle",
  component: DropdownToggle,
  args: {
    variant: "primary",
  },
} as ComponentMeta<typeof DropdownToggle>;

const Template: ComponentStory<typeof DropdownToggle> = (args) => {
  return (
    <Dropdown>
      <DropdownToggle {...args}>Export</DropdownToggle>
    </Dropdown>
  );
};

export const Primary = Template.bind({});

export const Secondary = Template.bind({});

Secondary.args = {
  variant: "secondary",
};

export const Success = Template.bind({});

Success.args = {
  variant: "success",
};

export const Info = Template.bind({});

Info.args = {
  variant: "info",
};

export const Warning = Template.bind({});

Warning.args = {
  variant: "warning",
};

export const Danger = Template.bind({});

Danger.args = {
  variant: "danger",
};

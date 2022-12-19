import { ComponentMeta, ComponentStory } from "@storybook/react";
import DropdownItem from "react-bootstrap/DropdownItem";
import Dropdown from "react-bootstrap/Dropdown";
import Menu from "../DropdownMenu";
import DropdownToggle from "../DropdownToggle";

export default {
  title: "components/DropdownMenu",
  component: Menu,
  subcomponents: { DropdownItem },
  args: {
    wide: false,
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Dropdown>
    <DropdownToggle>Selection</DropdownToggle>
    <Menu {...args}>
      <Dropdown.Item>Option 1</Dropdown.Item>
      <Dropdown.Item>Option 2</Dropdown.Item>
      <Dropdown.Item>Option 3</Dropdown.Item>
    </Menu>
  </Dropdown>
);

export const Default = Template.bind({});

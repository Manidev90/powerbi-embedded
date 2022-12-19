import { ComponentMeta, ComponentStory } from "@storybook/react";
import Unauthorized from ".";

export default {
  title: "pages/Unauthorized",
  component: Unauthorized,
} as ComponentMeta<typeof Unauthorized>;

export const Default: ComponentStory<typeof Unauthorized> = () => (
  <Unauthorized />
);

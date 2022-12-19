import { ComponentMeta, ComponentStory } from "@storybook/react";
import Loading from "../Loading/Progress";

export default {
  title: "components/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (props) => (
  <Loading {...props}></Loading>
);

export const Default = Template.bind({});

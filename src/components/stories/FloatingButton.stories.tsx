import { ComponentMeta, ComponentStory } from "@storybook/react";
import FloatingButton from "../FloatingButton";
import { RiQuestionAnswerLine } from "react-icons/ri";

export default {
  title: "components/FloatingButton",
  component: FloatingButton,
} as ComponentMeta<typeof FloatingButton>;

const Template: ComponentStory<typeof FloatingButton> = () => (
  <FloatingButton title="Interactive QnA" Icon={RiQuestionAnswerLine} />
);

export const Default = Template.bind({});

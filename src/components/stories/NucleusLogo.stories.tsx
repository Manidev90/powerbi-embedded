import { ComponentMeta, ComponentStory } from "@storybook/react";
import NucleusLogo from "../NucleusLogo";

export default {
  title: "components/NucleusLogo",
  component: NucleusLogo,
} as ComponentMeta<typeof NucleusLogo>;

const Template: ComponentStory<typeof NucleusLogo> = () => <NucleusLogo />;

export const Default = Template.bind({});

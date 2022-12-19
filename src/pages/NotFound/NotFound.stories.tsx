import { ComponentMeta, ComponentStory } from "@storybook/react";
import NotFound from "./index.";

export default {
  title: "pages/NotFound",
  component: NotFound,
} as ComponentMeta<typeof NotFound>;

export const Default: ComponentStory<typeof NotFound> = () => <NotFound />;

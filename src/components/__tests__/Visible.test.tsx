import { render, screen } from "@testing-library/react";
import Visible from "../Visible";

test("Children are not rendered when the condition is false", () => {
  render(
    <Visible when={false}>
      <div data-testid="child">children</div>
    </Visible>
  );

  expect(screen.queryByTestId("child")).toBeNull();
});

test("Children are rendered when the condition is true", () => {
  render(
    <Visible when={true}>
      <div data-testid="child">children</div>
    </Visible>
  );

  expect(screen.queryByTestId("child")).toBeTruthy();
});

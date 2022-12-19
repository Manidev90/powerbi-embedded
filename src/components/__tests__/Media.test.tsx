import { render, screen } from "@testing-library/react";
import Media from "../Media";

test("Child doesn't render when media query doesn't match", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  render(
    <Media query="(min-width : 12px)">
      <h1>Child</h1>
    </Media>
  );

  expect(screen.queryByText(/child/i)).toBeNull();
});

import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/app/App";

describe("Shah Shqip application shell", () => {
  it("renders the 3D prototype interface", () => {
    const markup = renderToStaticMarkup(<App />);
    expect(markup).toContain("SHAH SHQIP");
    expect(markup).toContain("The First Board");
    expect(markup).toContain("32 placeholders");
    expect(markup).toContain("Chess rules are not connected yet.");
  });
});

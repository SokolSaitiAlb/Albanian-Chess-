import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/app/App";

describe("Shah Shqip application shell", () => {
  it("renders the product title and current foundation status", () => {
    const markup = renderToStaticMarkup(<App />);
    expect(markup).toContain("SHAH SHQIP");
    expect(markup).toContain("Project foundation");
  });
});

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds toBeInTheDocument() and friends to expect().
import "@testing-library/jest-dom/vitest";

// Without this, the second test would still see what the first rendered.
afterEach(() => {
  cleanup();
});
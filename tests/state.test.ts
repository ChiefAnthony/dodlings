import { describe, expect, it } from "vitest";
import { exercises, findExercise } from "../src/manifest.js";
import { freshState, mark, nextPending } from "../src/state.js";

describe("exercise manifest", () => {
  it("has unique slugs and complete paths", () => {
    const slugs = new Set(exercises.map((exercise) => exercise.slug));
    expect(slugs.size).toBe(exercises.length);
    expect(exercises).toHaveLength(8);
    expect(findExercise("products1")?.path).toBe("exercises/01_products.test.ts");
  });
});

describe("state", () => {
  it("starts at the first exercise", () => {
    const state = freshState();
    expect(state.current).toBe("products1");
    expect(nextPending(state)).toBe("products1");
  });

  it("selects the next pending exercise", () => {
    const state = mark(freshState(), "products1", "done");
    expect(nextPending(state)).toBe("totals1");
  });
});

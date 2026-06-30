import { describe, it, expect } from "vitest";
import { applyAnswer, isWeak } from "./progress";

describe("applyAnswer", () => {
  it("初回正解", () => {
    const r = applyAnswer(undefined, true, 100);
    expect(r).toEqual({ attempts: 1, correctCount: 1, lastCorrect: true, lastAt: 100 });
  });
  it("2回目に誤答すると attempts増・lastCorrect=false", () => {
    const r1 = applyAnswer(undefined, true, 100);
    const r2 = applyAnswer(r1, false, 200);
    expect(r2).toEqual({ attempts: 2, correctCount: 1, lastCorrect: false, lastAt: 200 });
  });
});

describe("isWeak", () => {
  it("未解答は苦手扱いしない", () => {
    expect(isWeak(undefined)).toBe(false);
  });
  it("直近誤答は苦手", () => {
    expect(isWeak({ attempts: 1, correctCount: 0, lastCorrect: false, lastAt: 1 })).toBe(true);
  });
  it("直近正解は苦手でない", () => {
    expect(isWeak({ attempts: 2, correctCount: 1, lastCorrect: true, lastAt: 1 })).toBe(false);
  });
});

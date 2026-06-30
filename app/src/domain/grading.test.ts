import { describe, it, expect } from "vitest";
import { gradeAnswer, normalizeKeys, requiredCount } from "./grading";

describe("normalizeKeys", () => {
  it("大文字化・重複除去・ソートする", () => {
    expect(normalizeKeys(["b", "A", "b"])).toEqual(["A", "B"]);
  });
});

describe("gradeAnswer", () => {
  it("単一回答: 一致で正解", () => {
    expect(gradeAnswer(["A"], ["A"])).toBe(true);
  });
  it("単一回答: 不一致で不正解", () => {
    expect(gradeAnswer(["B"], ["A"])).toBe(false);
  });
  it("複数回答: 順不同で一致すれば正解", () => {
    expect(gradeAnswer(["C", "B"], ["B", "C"])).toBe(true);
  });
  it("複数回答: 一部だけ選択は不正解", () => {
    expect(gradeAnswer(["B"], ["B", "C"])).toBe(false);
  });
  it("複数回答: 余分に選択は不正解", () => {
    expect(gradeAnswer(["B", "C", "D"], ["B", "C"])).toBe(false);
  });
  it("未選択は不正解", () => {
    expect(gradeAnswer([], ["A"])).toBe(false);
  });
});

describe("requiredCount", () => {
  it("正解数を返す", () => {
    expect(requiredCount(["A"])).toBe(1);
    expect(requiredCount(["B", "E"])).toBe(2);
  });
});

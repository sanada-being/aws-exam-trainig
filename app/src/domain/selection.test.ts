import { describe, it, expect } from "vitest";
import { shuffle, orderQuestions } from "./selection";
import type { Question } from "../types";

function q(n: number): Question {
  return {
    id: `saa-c03-${n}`,
    questionNumber: n,
    topic: 1,
    isMultipleAnswer: false,
    question: { en: "e", ja: "j" },
    options: [{ key: "A", en: "a", ja: "あ" }],
    adoptedAnswer: ["A"],
    communityVote: [],
    answerConfidence: "high",
    needsReview: false,
  };
}

describe("shuffle", () => {
  it("同じ要素集合を保つ（決定的rngで検証）", () => {
    const seq = [0.9, 0.1, 0.5, 0.0];
    let i = 0;
    const rng = () => seq[i++ % seq.length];
    const out = shuffle([1, 2, 3, 4], rng);
    expect(out.slice().sort()).toEqual([1, 2, 3, 4]);
  });
});

describe("orderQuestions", () => {
  it("sequential は問題番号順", () => {
    const out = orderQuestions([q(3), q(1), q(2)], "sequential");
    expect(out.map((x) => x.questionNumber)).toEqual([1, 2, 3]);
  });
  it("random は全要素を保持する", () => {
    const out = orderQuestions([q(1), q(2), q(3)], "random", () => 0.5);
    expect(out.map((x) => x.questionNumber).sort()).toEqual([1, 2, 3]);
  });
});

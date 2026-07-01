import { describe, it, expect } from "vitest";
import { applyFilters, isFilterActive, emptyFilter } from "./filter";
import type { Question, Confidence } from "../types";

function q(n: number, conf: Confidence, needsReview = false): Question {
  return {
    id: `q${n}`,
    questionNumber: n,
    topic: 1,
    isMultipleAnswer: false,
    question: { en: "e", ja: "j" },
    options: [],
    adoptedAnswer: ["A"],
    communityVote: [],
    answerConfidence: conf,
    needsReview,
  };
}

const qs = [q(1, "high"), q(2, "low", true), q(3, "medium")];

describe("isFilterActive", () => {
  it("空フィルタは非アクティブ", () => {
    expect(isFilterActive(emptyFilter)).toBe(false);
  });
  it("条件があればアクティブ", () => {
    expect(isFilterActive({ ...emptyFilter, bookmarkedOnly: true })).toBe(true);
  });
});

describe("applyFilters", () => {
  it("空フィルタは全件", () => {
    expect(applyFilters(qs, emptyFilter, {})).toHaveLength(3);
  });
  it("確信度で絞り込む", () => {
    const out = applyFilters(qs, { ...emptyFilter, confidences: ["high", "medium"] }, {});
    expect(out.map((x) => x.questionNumber)).toEqual([1, 3]);
  });
  it("要確認のみ", () => {
    const out = applyFilters(qs, { ...emptyFilter, needsReviewOnly: true }, {});
    expect(out.map((x) => x.questionNumber)).toEqual([2]);
  });
  it("ブックマークのみ", () => {
    const out = applyFilters(qs, { ...emptyFilter, bookmarkedOnly: true }, { q3: true });
    expect(out.map((x) => x.questionNumber)).toEqual([3]);
  });

  it("未正解のみ＝未回答＋誤答（正解済みを除外）", () => {
    const records = {
      q1: { attempts: 1, correctCount: 1, lastCorrect: true, lastAt: 1 }, // 正解済み→除外
      q2: { attempts: 1, correctCount: 0, lastCorrect: false, lastAt: 2 }, // 誤答→残る
      // q3 未回答→残る
    };
    const out = applyFilters(qs, { ...emptyFilter, excludeMastered: true }, {}, records);
    expect(out.map((x) => x.questionNumber).sort()).toEqual([2, 3]);
  });
});

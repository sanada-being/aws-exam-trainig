import type { Question, Confidence } from "../types";

export interface Filter {
  confidences: Confidence[]; // 空=すべて
  needsReviewOnly: boolean;
  bookmarkedOnly: boolean;
}

export const emptyFilter: Filter = {
  confidences: [],
  needsReviewOnly: false,
  bookmarkedOnly: false,
};

export function isFilterActive(f: Filter): boolean {
  return f.confidences.length > 0 || f.needsReviewOnly || f.bookmarkedOnly;
}

/** 条件で問題を絞り込む（純粋関数）。 */
export function applyFilters(
  questions: Question[],
  filter: Filter,
  bookmarks: Record<string, true>,
): Question[] {
  return questions.filter((q) => {
    if (filter.confidences.length > 0 && !filter.confidences.includes(q.answerConfidence))
      return false;
    if (filter.needsReviewOnly && !q.needsReview) return false;
    if (filter.bookmarkedOnly && !bookmarks[q.id]) return false;
    return true;
  });
}

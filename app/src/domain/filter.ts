import type { Question, Confidence } from "../types";
import type { Records } from "./progress";

export interface Filter {
  confidences: Confidence[]; // 空=すべて
  needsReviewOnly: boolean;
  bookmarkedOnly: boolean;
  excludeMastered: boolean; // 正解済み(直近正解)を除外＝未回答＋誤答のみ
}

export const emptyFilter: Filter = {
  confidences: [],
  needsReviewOnly: false,
  bookmarkedOnly: false,
  excludeMastered: false,
};

export function isFilterActive(f: Filter): boolean {
  return (
    f.confidences.length > 0 || f.needsReviewOnly || f.bookmarkedOnly || f.excludeMastered
  );
}

/** 直近で正解済み（＝マスター）か。 */
export function isMastered(rec: Records[string] | undefined): boolean {
  return !!rec && rec.lastCorrect;
}

/** 条件で問題を絞り込む（純粋関数）。excludeMastered には records が必要。 */
export function applyFilters(
  questions: Question[],
  filter: Filter,
  bookmarks: Record<string, true>,
  records: Records = {},
): Question[] {
  return questions.filter((q) => {
    if (filter.confidences.length > 0 && !filter.confidences.includes(q.answerConfidence))
      return false;
    if (filter.needsReviewOnly && !q.needsReview) return false;
    if (filter.bookmarkedOnly && !bookmarks[q.id]) return false;
    if (filter.excludeMastered && isMastered(records[q.id])) return false;
    return true;
  });
}

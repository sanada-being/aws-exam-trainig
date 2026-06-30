/** 学習進捗のレコードと、その更新・集計（純粋関数）。 */

export interface QRecord {
  attempts: number;
  correctCount: number;
  lastCorrect: boolean;
  lastAt: number;
}

export type Records = Record<string, QRecord>;

/** 1回の解答をレコードに反映（非破壊）。 */
export function applyAnswer(prev: QRecord | undefined, correct: boolean, at: number): QRecord {
  return {
    attempts: (prev?.attempts ?? 0) + 1,
    correctCount: (prev?.correctCount ?? 0) + (correct ? 1 : 0),
    lastCorrect: correct,
    lastAt: at,
  };
}

/** 直近で間違えた（または一度も正解していない）問題か。苦手復習の判定に使う。 */
export function isWeak(rec: QRecord | undefined): boolean {
  if (!rec) return false;
  return !rec.lastCorrect;
}

/** 採点ロジック（純粋関数）。学習用の正解は adoptedAnswer（投票最多）を基準にする。 */

/** 回答記号集合を正規化（大文字・重複除去・ソート）。 */
export function normalizeKeys(keys: string[]): string[] {
  return [...new Set(keys.map((k) => k.toUpperCase()))].sort();
}

/** 選択した回答が正解集合と完全一致するか（順不同・複数回答対応）。 */
export function gradeAnswer(selected: string[], adopted: string[]): boolean {
  const a = normalizeKeys(selected);
  const b = normalizeKeys(adopted);
  if (a.length === 0 || a.length !== b.length) return false;
  return a.every((k, i) => k === b[i]);
}

/** その問題で選ぶべき正解の数（複数回答問題のUI制御に使う）。 */
export function requiredCount(adopted: string[]): number {
  return normalizeKeys(adopted).length;
}

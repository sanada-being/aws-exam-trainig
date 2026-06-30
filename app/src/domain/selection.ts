import type { Question } from "../types";

export type QuizMode = "sequential" | "random";

/** Fisher–Yates シャッフル（非破壊）。 */
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 出題順を決める（#7でモード拡張予定）。 */
export function orderQuestions(
  questions: Question[],
  mode: QuizMode,
  rng: () => number = Math.random,
): Question[] {
  if (mode === "random") return shuffle(questions, rng);
  return [...questions].sort((a, b) => a.questionNumber - b.questionNumber);
}

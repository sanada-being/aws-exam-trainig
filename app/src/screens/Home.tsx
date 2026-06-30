import type { Question } from "../types";
import type { QuizMode } from "../domain/selection";
import { summarize } from "../domain/dataset";

export function Home({
  questions,
  onStart,
}: {
  questions: Question[];
  onStart: (mode: QuizMode) => void;
}) {
  const s = summarize(questions);
  return (
    <div className="home">
      <h1>AWS SAA 問題集</h1>
      <p className="muted">
        全 <strong>{s.total}</strong> 問・Topic {Object.keys(s.byTopic).length}
      </p>

      <div className="actions">
        <button type="button" className="btn primary big" onClick={() => onStart("sequential")}>
          順番に学習
        </button>
        <button type="button" className="btn big" onClick={() => onStart("random")}>
          ランダム出題
        </button>
      </div>
    </div>
  );
}

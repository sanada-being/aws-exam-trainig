import { useEffect, useState } from "react";
import type { Question } from "./types";
import { loadQuestions } from "./data/loader";
import { orderQuestions, type QuizMode } from "./domain/selection";
import { Home } from "./screens/Home";
import { Quiz } from "./screens/Quiz";

export default function App() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [queue, setQueue] = useState<Question[] | null>(null);

  useEffect(() => {
    loadQuestions()
      .then(setQuestions)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <div className="center">読み込みエラー: {error}</div>;
  if (!questions) return <div className="center">読み込み中…</div>;
  if (queue) return <Quiz queue={queue} onExit={() => setQueue(null)} />;

  return (
    <Home
      questions={questions}
      onStart={(mode: QuizMode) => setQueue(orderQuestions(questions, mode))}
    />
  );
}

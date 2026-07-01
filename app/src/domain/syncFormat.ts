import type { SyncStatus } from "../store/useSync";

/** Date を HH:MM（ゼロ埋め・ローカル時刻）に整形。 */
export function formatClock(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

/** 最終同期時刻(epoch ms)を表示用文字列に。未同期は空。 */
export function formatSyncTime(ts: number | null): string {
  if (!ts) return "";
  return formatClock(new Date(ts));
}

/** 同期状態の日本語ラベル。 */
export function syncStatusLabel(status: SyncStatus, enabled: boolean): string {
  if (!enabled) return "同期オフ";
  switch (status) {
    case "syncing":
      return "同期中…";
    case "ok":
      return "同期済み";
    case "error":
      return "同期エラー";
    default:
      return "待機中";
  }
}

import { useSync } from "../store/useSync";
import { formatSyncTime, syncStatusLabel } from "../domain/syncFormat";

/** 同期の状態を小さく表示するインジケータ。 */
export function SyncIndicator({ showTime = true }: { showTime?: boolean }) {
  const enabled = useSync((s) => s.enabled);
  const status = useSync((s) => s.status);
  const lastSyncedAt = useSync((s) => s.lastSyncedAt);

  if (!enabled) return null;

  const label = syncStatusLabel(status, enabled);
  const time = showTime ? formatSyncTime(lastSyncedAt) : "";
  const icon = status === "syncing" ? "⟳" : status === "error" ? "⚠" : "✓";

  return (
    <span
      className={`syncind ${status}`}
      data-testid="syncind"
      title={useSync.getState().lastError ?? label}
    >
      {icon} {label}
      {time && status !== "syncing" ? ` ${time}` : ""}
    </span>
  );
}

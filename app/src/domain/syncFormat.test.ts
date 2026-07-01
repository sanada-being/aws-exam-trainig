import { describe, it, expect } from "vitest";
import { formatClock, formatSyncTime, syncStatusLabel } from "./syncFormat";

describe("formatClock", () => {
  it("HH:MM にゼロ埋め", () => {
    expect(formatClock(new Date(2020, 0, 1, 9, 5))).toBe("09:05");
    expect(formatClock(new Date(2020, 0, 1, 23, 59))).toBe("23:59");
  });
});

describe("formatSyncTime", () => {
  it("null/0 は空", () => {
    expect(formatSyncTime(null)).toBe("");
    expect(formatSyncTime(0)).toBe("");
  });
  it("時刻を返す", () => {
    const ts = new Date(2020, 0, 1, 7, 8).getTime();
    expect(formatSyncTime(ts)).toBe("07:08");
  });
});

describe("syncStatusLabel", () => {
  it("無効なら同期オフ", () => {
    expect(syncStatusLabel("ok", false)).toBe("同期オフ");
  });
  it("状態ごとの日本語", () => {
    expect(syncStatusLabel("syncing", true)).toBe("同期中…");
    expect(syncStatusLabel("ok", true)).toBe("同期済み");
    expect(syncStatusLabel("error", true)).toBe("同期エラー");
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SyncIndicator } from "./SyncIndicator";
import { useSync } from "../store/useSync";

beforeEach(() => useSync.getState().clear());

describe("SyncIndicator", () => {
  it("同期無効なら何も表示しない", () => {
    const { container } = render(<SyncIndicator />);
    expect(container).toBeEmptyDOMElement();
  });

  it("有効・ok・時刻ありなら 同期済み＋時刻を表示", () => {
    useSync.setState({
      enabled: true,
      status: "ok",
      lastSyncedAt: new Date(2020, 0, 1, 8, 9).getTime(),
    });
    render(<SyncIndicator />);
    const el = screen.getByTestId("syncind");
    expect(el).toHaveTextContent("同期済み");
    expect(el).toHaveTextContent("08:09");
  });

  it("エラー時はエラー表示", () => {
    useSync.setState({ enabled: true, status: "error", lastError: "boom" });
    render(<SyncIndicator />);
    expect(screen.getByTestId("syncind")).toHaveTextContent("同期エラー");
  });
});

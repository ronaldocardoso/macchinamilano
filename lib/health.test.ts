import { describe, expect, it } from "vitest";

import { createHealthPayload } from "./health";

describe("createHealthPayload", () => {
  it("reports the real Phase 0 database state", () => {
    const payload = createHealthPayload({
      database: "not_configured",
      timestamp: new Date("2026-07-23T12:00:00.000Z"),
      version: "0.1.0",
    });

    expect(payload).toEqual({
      status: "ok",
      database: "not_configured",
      version: "0.1.0",
      timestamp: "2026-07-23T12:00:00.000Z",
    });
  });
});

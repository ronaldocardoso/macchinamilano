type DatabaseHealth = "ok" | "degraded" | "not_configured";

type HealthPayloadOptions = {
  database: DatabaseHealth;
  timestamp?: Date;
  version: string;
};

export function createHealthPayload({
  database,
  timestamp = new Date(),
  version,
}: HealthPayloadOptions) {
  return {
    status: database === "degraded" ? "degraded" : "ok",
    database,
    version,
    timestamp: timestamp.toISOString(),
  } as const;
}

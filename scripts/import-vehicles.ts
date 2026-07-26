import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { parseArgs } from "node:util";

import {
  processVehicleImport,
  type ImportPolicy,
} from "../lib/imports/vehicle-import.ts";
import {
  adaptPiloterrAutoScout24Export,
  type PiloterrAutoScout24Export,
} from "../lib/imports/piloterr-autoscout24.ts";

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    "catalog-output": { type: "string" },
    adapter: { type: "string", default: "raw" },
    limit: { type: "string", default: "100" },
    radius: { type: "string", default: "25" },
    "min-price": { type: "string", default: "100000" },
    "allow-private": { type: "boolean", default: false },
    "allow-missing-images": { type: "boolean", default: false },
  },
});

if (!values.input) {
  throw new Error(
    "Missing --input. Use a JSON or NDJSON file from an authorized feed/export.",
  );
}

function positiveNumber(value: string | undefined, option: string) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${option} must be a positive number.`);
  }

  return number;
}

function parseRecords(content: string, extension: string) {
  if (extension === ".ndjson" || extension === ".jsonl") {
    return content
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line) as unknown);
  }

  const parsed = JSON.parse(content) as unknown;

  if (values.adapter === "piloterr-autoscout24") {
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Piloterr input must be a JSON object.");
    }

    return adaptPiloterrAutoScout24Export(parsed as PiloterrAutoScout24Export);
  }

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (
    typeof parsed === "object" &&
    parsed !== null &&
    "records" in parsed &&
    Array.isArray(parsed.records)
  ) {
    return parsed.records;
  }

  throw new Error(
    "JSON input must be an array or an object with a records array.",
  );
}

const inputPath = resolve(values.input);
const outputPath = resolve(
  values.output ??
    `var/imports/report-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
);
const content = await readFile(inputPath, "utf8");
const records = parseRecords(content, extname(inputPath).toLocaleLowerCase());
const policy: Partial<ImportPolicy> = {
  limit: positiveNumber(values.limit, "--limit"),
  radiusKm: positiveNumber(values.radius, "--radius"),
  minPriceExclusive: positiveNumber(values["min-price"], "--min-price"),
  dealerOnly: !values["allow-private"],
  requireImages: !values["allow-missing-images"],
};
const report = processVehicleImport(records, { policy });

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

if (values["catalog-output"]) {
  const catalogOutputPath = resolve(values["catalog-output"]);
  const catalog = {
    schemaVersion: report.schemaVersion,
    generatedAt: report.startedAt,
    sourceRunId: report.runId,
    dealers: report.dealers,
    vehicles: report.vehicles,
  };

  await mkdir(dirname(catalogOutputPath), { recursive: true });
  await writeFile(
    catalogOutputPath,
    `${JSON.stringify(catalog, null, 2)}\n`,
    "utf8",
  );
}

process.stdout.write(
  [
    `Import run: ${report.runId}`,
    `Received: ${report.summary.received}`,
    `Accepted: ${report.summary.accepted}`,
    `Rejected: ${report.summary.rejected}`,
    `Dealers: ${report.summary.dealers}`,
    `Report: ${outputPath}`,
    values["catalog-output"]
      ? `Catalog: ${resolve(values["catalog-output"])}`
      : "Catalog: not generated (review the report first)",
  ].join("\n") + "\n",
);

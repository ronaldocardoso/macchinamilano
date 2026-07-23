import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  APP_NAME: z.string().trim().min(1).default("Macchina Milano"),
  APP_URL: z.url().default("https://macchinamilano.com"),
  APP_LOCALE: z.literal("it-IT").default("it-IT"),
  APP_TIMEZONE: z.literal("Europe/Rome").default("Europe/Rome"),
  APP_VERSION: z.string().trim().min(1).default("0.1.0"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
});

const result = environmentSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  APP_LOCALE: process.env.APP_LOCALE,
  APP_TIMEZONE: process.env.APP_TIMEZONE,
  APP_VERSION: process.env.APP_VERSION,
  LOG_LEVEL: process.env.LOG_LEVEL,
});

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = result.data;

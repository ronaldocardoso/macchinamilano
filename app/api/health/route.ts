import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { createHealthPayload } from "@/lib/health";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    createHealthPayload({
      database: "not_configured",
      version: env.APP_VERSION,
    }),
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

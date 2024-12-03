import { NextResponse } from "next/server";
import { getContext } from "@/instrumentation";

export async function GET(_request: Request) {
  return NextResponse.json(getContext().oauthClient.clientMetadata);
}

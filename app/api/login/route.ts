// app/api/login/route.ts
import { getContext } from "@/instrumentation";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const formData = await request.formData();
  const handle = formData.get("handle");

  if (!handle || typeof handle !== "string") {
    throw new Error("Invalid handle provided");
  }

  const ctx = getContext();

  // Get authorization URL and redirect - this is all we need
  const url = await ctx.oauthClient.authorize(handle, {
    scope: "atproto transition:generic",
  });

  return redirect(url.toString());
}

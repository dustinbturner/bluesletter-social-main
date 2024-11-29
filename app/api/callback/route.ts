// app/api/callback/route.ts
import { getContext } from "@/instrumentation";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const ctx = getContext();
  const params = new URLSearchParams(new URL(request.url).search);

  try {
    await ctx.oauthClient.callback({
      code: (params.get("code") as string) || "",
      state: (params.get("state") as string) || "",
    });

    // After successful authentication, redirect to dashboard
    return redirect("/dashboard");
  } catch (error) {
    console.error("OAuth callback failed:", error);
    return redirect("/login");
  }
}

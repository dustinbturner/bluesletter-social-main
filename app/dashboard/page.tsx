// app/dashboard/page.tsx
import { getSessionAgent } from "@/context";
import { getContext } from "@/instrumentation";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const ctx = getContext();
  const agent = await getSessionAgent(ctx);

  if (!agent) {
    redirect("/login");
  }

  return <DashboardClient />;
}

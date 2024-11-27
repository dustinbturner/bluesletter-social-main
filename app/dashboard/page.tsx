// src/app/dashboard/page.tsx

"use server";

import { redirect } from "next/navigation";
import DashboardClient from "@/app/dashboard/dashboard-client";

export default async function DashboardPage() {
  // Assuming you have some logic to check if the user is logged in
  const isLoggedIn = true; // Replace with actual login check

  if (!isLoggedIn) {
    redirect("/");
  }

  return <DashboardClient />;
}

"use client"
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>Dashboard</div>;
}

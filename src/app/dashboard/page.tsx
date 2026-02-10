"use client"
import DashboardClient from "@/components/DashboardClient";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();

  if(!isLoaded) return null;
  if (!userId) {
    redirect("/sign-in");
  }

  return <div>
    <DashboardClient ownerId={userId} />
  </div>;
}

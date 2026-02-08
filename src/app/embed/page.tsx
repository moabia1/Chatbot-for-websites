"use client";
import EmbedClient from "@/components/EmbedClient";
import { useAuth } from "@clerk/nextjs";
import React from "react";

function page() {
  const { userId } = useAuth();
  return (
    <>
      <EmbedClient ownerId={userId!} />
    </>
  );
}

export default page;

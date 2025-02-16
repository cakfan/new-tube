"use client";

import { trpc } from "@/trpc/client";

export const ClientPage = () => {
  const { data, isLoading, error } = trpc.hello.useQuery(
    { name: "Skuy" },
    { retry: false }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("TRPC Error:", error);
    return <div>Error: {error.message}</div>;
  }
  return <div>Hi, {data?.greeting}</div>;
};

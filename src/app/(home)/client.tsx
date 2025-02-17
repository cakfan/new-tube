"use client";

import { trpc } from "@/trpc/client";

export const ClientPage = () => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) {
  //   console.error("TRPC Error:", error);
  //   return <div>Error: {error.message}</div>;
  // }
  return <div>Categories:{JSON.stringify(data)}</div>;
};

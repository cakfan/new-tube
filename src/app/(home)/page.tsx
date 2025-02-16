import { HydrateClient, trpc } from "@/trpc/server";
import { ClientPage } from "./client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default async function Home() {
  void trpc.hello.prefetch({ name: "Taufan Kuy" });
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <ClientPage />
          <p>SKuy</p>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

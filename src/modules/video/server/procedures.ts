import { db } from "@/db";
import { video } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const [videoCreated] = await db
      .insert(video)
      .values({
        userId,
        title: "Undetitled",
      })
      .returning();

    return { video: videoCreated };
  }),
});

import { db } from "@/db";
import { video } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, and, or, lt, desc } from "drizzle-orm";
import { z } from "zod";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;
      const data = await db
        .select()
        .from(video)
        .where(
          and(
            eq(video.userId, userId),
            cursor
              ? or(
                  lt(video.updatedAt, cursor.updatedAt),
                  and(
                    eq(video.updatedAt, cursor.updatedAt),
                    lt(video.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(video.updatedAt), desc(video.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;

      // Remove the last item if there is more data
      const items = hasMore ? data.slice(0, -1) : data;

      // Set the next cursor to the last item if there is more data
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? { id: lastItem.id, updatedAt: lastItem.updatedAt! }
        : null;

      return { items, nextCursor };
    }),
});

import { getUser } from "@/actions/user/get";
import { getMe } from "@/actions/user/me";
import { rateLimit } from "@/lib/ratelimit";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const user = await getMe();
  return { userId: user?.id };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts;
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
    // console.log("TRPC_ERROR:", "UNAUTHORIZED");
  }

  const user = await getUser({ id: ctx.userId });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { success } = await rateLimit.limit(user.id);

  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

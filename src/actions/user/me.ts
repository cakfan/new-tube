"use server";

import { db } from "@/db";
import { user, UserType } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getMe = async (): Promise<UserType | null | undefined> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return null;
  }

  const [data] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return data;
};

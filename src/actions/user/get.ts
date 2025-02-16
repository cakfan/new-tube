"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq, or } from "drizzle-orm";

interface GetUserProps {
  id?: string | null;
  username?: string | null;
}

export async function getUser({ id, username }: GetUserProps) {
  if (!id && !username) return null;

  const [data] = await db
    .select()
    .from(user)
    .where(or(eq(user.id, id ?? ""), eq(user.username, username ?? "")))
    .limit(1);

  return data ?? null;
}

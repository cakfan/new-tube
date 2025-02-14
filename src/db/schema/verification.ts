import { text, timestamp } from "drizzle-orm/pg-core";
import { newTubeSchema } from "./new-tube";

export const verification = newTubeSchema.table("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

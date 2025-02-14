import { boolean, text, timestamp } from "drizzle-orm/pg-core";
import { gender, role, newTubeSchema } from ".";

export const user = newTubeSchema.table("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: role("role").default("member").notNull(),
  gender: gender("gender").default("male"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type UserType = typeof user.$inferSelect;

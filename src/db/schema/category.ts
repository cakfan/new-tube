import { text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { newTubeSchema } from "./new-tube";
import { relations } from "drizzle-orm";
import { video } from "./video";

export const category = newTubeSchema.table(
  "category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [uniqueIndex("name_idx").on(t.name)]
);

export const categoryRelations = relations(category, ({ many }) => ({
  videos: many(video),
}));

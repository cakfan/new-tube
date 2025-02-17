import { text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { newTubeSchema } from "./new-tube";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { category } from "./category";

export const video = newTubeSchema.table(
  "video",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    userId: text("user_id")
      .references(() => user.id, {
        onDelete: "cascade",
      })
      .notNull(),
    categoryId: uuid("category_id").references(() => category.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [uniqueIndex("title_idx").on(t.title)]
);

export const videoRelations = relations(video, ({ one }) => ({
  user: one(user, {
    fields: [video.userId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [video.categoryId],
    references: [category.id],
  }),
}));

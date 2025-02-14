import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db",
  dialect: "postgresql",
  schemaFilter: ["public", "newtube"],
  dbCredentials: {
    url: process.env.DIRECT_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});

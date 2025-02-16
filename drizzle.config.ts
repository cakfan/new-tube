import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".evn.local" });

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
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

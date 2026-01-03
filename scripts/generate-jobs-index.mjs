// scripts/generate-jobs-index.mjs
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobsDir = path.join(__dirname, "..", "content", "jobs");
const indexPath = path.join(jobsDir, "index.json");

async function main() {
  // make sure the directory exists
  await fs.mkdir(jobsDir, { recursive: true });

  const entries = await fs.readdir(jobsDir, { withFileTypes: true });

  const jobFiles = entries
    .filter(
      (e) =>
        e.isFile() &&
        e.name.endsWith(".json") &&
        e.name !== "index.json" // don’t include the index itself
    )
    .map((e) => e.name);

  const indexData = { jobs: jobFiles };

  await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2), "utf8");
  console.log("Generated content/jobs/index.json with:", jobFiles);
}

main().catch((err) => {
  console.error("Error generating jobs index:", err);
  process.exit(1);
});

import { Functionz } from "./src/core/framework";
import { loadDefaultPacks } from "./src/packs";
import { createServer } from "./src/dashboard/server";
import { config } from "dotenv";

// Load .env file
config();

async function main() {
  const framework = new Functionz({
    dbPath: process.env.DB_PATH || "babyagi.sqlite",
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiBaseUrl: process.env.OPENAI_BASE_URL,
    defaultModel: process.env.LLM_MODEL || "gpt-3.5-turbo",
  });

  // Load all built-in function packs
  await loadDefaultPacks(framework);

  // Register OpenAI key if provided
  if (process.env.OPENAI_API_KEY) {
    framework.add_key_wrapper("openai_api_key", process.env.OPENAI_API_KEY);
  }

  // Start the Bun HTTP server with dashboard
  const dashboardRoute = process.env.DASHBOARD_ROUTE || "/dashboard";
  const port = parseInt(process.env.PORT || "3000", 10);
  const { server } = createServer(framework, { port, dashboardRoute });

  const url = `http://localhost:${port}${dashboardRoute}`;
  console.log("\x1b[95m\x1b[1m");
  console.log("███████╗██╗   ██╗██╗   ██╗ █████╗  ██████╗ ██╗");
  console.log("██╔════╝██║   ██║██║   ██║██╔══██╗██╔════╝ ██║");
  console.log("███████╗██║   ██║██║   ██║███████║██║  ███╗██║");
  console.log("╚════██║██║   ██║██║   ██║██╔══██║██║   ██║██║");
  console.log("███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╔╝██║");
  console.log("╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝");
  console.log("\x1b[0m");
  console.log("\x1b[96m\x1b[1mBabyAGI — TypeScript/Bun Edition\x1b[0m");
  console.log(`\x1b[92m✓ Server running at: \x1b[4m${url}\x1b[0m`);
  console.log(
    `\x1b[93m✓ Functions loaded: ${framework.getAllFunctions().length}\x1b[0m`
  );
  if (!process.env.OPENAI_API_KEY) {
    console.log(
      "\x1b[90m⚠ OPENAI_API_KEY not set — using intelligent mock responses. Add it in .env or via the Keys page.\x1b[0m"
    );
  }
  console.log("\x1b[90mPress Ctrl+C to stop.\x1b[0m\n");
}

main().catch((err) => {
  console.error("\x1b[91m[BabyAGI] Fatal startup error:\x1b[0m", err);
  process.exit(1);
});
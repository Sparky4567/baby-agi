import { Functionz } from "../src/core/framework";
import { loadDefaultPacks } from "../src/packs";

/**
 * Self-Building Agent Example
 * BabyAGI v2 concept: generate queries from user persona → choose or create functions → execute them
 */
async function selfBuildExample() {
  const framework = new Functionz({ dbPath: ":memory:" });
  await loadDefaultPacks(framework);

  if (process.env.OPENAI_API_KEY) {
    framework.add_key_wrapper("openai_api_key", process.env.OPENAI_API_KEY);
  }

  const result = await framework.self_build({
    userDescription: "A growth marketer at an enterprise SaaS company focused on improving conversion and retention.",
    queryCount: 3,
    onProgress: (step, data) => {
      console.log(`\x1b[94m[Self-Build]\x1b[0m ${step}`);
      if (data?.query) {
        console.log(`  Query: "${data.query}"`);
      }
    },
  });

  console.log("\n\x1b[92m=== SELF-BUILD RESULTS ===\x1b[0m");
  console.log(`User Description: ${result.userDescription}`);
  console.log(`Queries processed: ${result.totalQueries}`);
  console.log(`Functions now registered: ${result.allFunctions.join(", ")}`);

  result.results.forEach((r: any, i: number) => {
    console.log(`\n[Query ${i + 1}] ${r.query}`);
    console.log(`  Action: ${r.decision.action} → ${r.decision.function_name}`);
    if (r.executionResult) {
      const preview = JSON.stringify(r.executionResult).slice(0, 120);
      console.log(`  Result: ${preview}`);
    }
  });
}

selfBuildExample().catch(console.error);

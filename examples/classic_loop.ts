import { Functionz } from "../src/core/framework";
import { loadDefaultPacks } from "../src/packs";

/**
 * Classic BabyAGI task loop example (original March 2023 concept)
 * Uses: task_execution_agent, task_creation_agent, prioritization_agent
 */
async function classicLoopExample() {
  const framework = new Functionz({ dbPath: ":memory:" });
  await loadDefaultPacks(framework);

  // Set OpenAI API key if available
  if (process.env.OPENAI_API_KEY) {
    framework.add_key_wrapper("openai_api_key", process.env.OPENAI_API_KEY);
  }

  const result = await framework.runClassicLoop({
    objective: "Research and summarize the top 5 best practices for building developer-first SaaS products.",
    initialTask: "Outline a task list to address the objective.",
    maxIterations: 3,
    onTaskStart: (task) => {
      console.log(`\n📋 Starting task [${task.task_id}]: ${task.task_name}`);
    },
    onTaskComplete: (task, result) => {
      console.log(`✅ Task [${task.task_id}] completed. Result preview: ${result.slice(0, 100)}...`);
    },
    onTaskCreated: (newTasks) => {
      console.log(`➕ ${newTasks.length} new task(s) added`);
    },
    onPrioritized: (taskList) => {
      console.log(`🔃 Task list reprioritized: ${taskList.map(t => t.task_name).join(" → ")}`);
    },
  });

  console.log("\n\x1b[92m=== FINAL SUMMARY ===\x1b[0m");
  console.log(`Objective: ${result.objective}`);
  console.log(`Completed iterations: ${result.completedIterations}`);
  console.log(`Tasks completed: ${result.history.length}`);
}

classicLoopExample().catch(console.error);

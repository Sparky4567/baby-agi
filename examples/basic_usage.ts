import { Functionz } from "../src/core/framework";
import { loadDefaultPacks } from "../src/packs";

/**
 * Basic usage example: register and run functions
 */
async function basicExample() {
  const framework = new Functionz({ dbPath: ":memory:" });
  await loadDefaultPacks(framework);

  // Register a simple function using the decorator-style API
  framework.register_function(
    function world() {
      return "world";
    },
    { name: "world", description: "Returns the string 'world'" }
  );

  framework.register_function(
    async function hello_world() {
      const w = await framework.executeFunction("world");
      return `Hello ${w}!`;
    },
    {
      name: "hello_world",
      dependencies: ["world"],
      description: "Greets the world",
    }
  );

  // Call function dynamically
  const result = await framework.executeFunction("hello_world");
  console.log("[Basic] hello_world():", result);

  // Circle area example with dependency
  const area = await framework.executeFunction("circle_area", 5);
  console.log("[Basic] circle_area(5):", area.toFixed(4));

  const volume = await framework.executeFunction("cylinder_volume", 5, 10);
  console.log("[Basic] cylinder_volume(5, 10):", volume.toFixed(4));

  console.log("[Basic] Registered functions:", framework.getAllFunctions().map(f => f.name));
}

basicExample().catch(console.error);

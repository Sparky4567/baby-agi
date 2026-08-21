# BabyAGI — TypeScript/Bun Edition

A faithful TypeScript port of [yoheinakajima/babyagi](https://github.com/yoheinakajima/babyagi), rebuilt from the ground up using **Bun** as the runtime, with `bun:sqlite` for persistence, a modern web dashboard, and a REST API.

## Features

| Feature | Description |
|---|---|
| 🗃️ **Functionz Registry** | Store, manage, and version functions dynamically in SQLite |
| 🔗 **Dependency Graph** | Functions declare their dependencies; resolved at runtime |
| ⚡ **Dynamic Execution** | Run registered functions by name with sandboxed scope |
| 🧠 **Vector Memory** | In-process cosine-similarity vector store for context retrieval |
| 🔄 **Classic BabyAGI Loop** | Original March 2023 task execution → creation → prioritization loop |
| 🤖 **Self-Building Agent** | Newer BabyAGI v2 concept: generates queries → creates missing tools → executes them |
| 🌐 **Web Dashboard** | Modern UI (Tailwind, dark mode) for managing functions, logs, keys |
| 🔌 **REST API** | Full CRUD for functions, run endpoints, log viewer |
| 🔑 **Secret Key Vault** | Store API keys in SQLite, resolved at function execution time |
| 📦 **Function Packs** | Built-in `default`, `ai`, `os`, `code_writing`, `self_build`, `classic` packs |

## Quick Start

### 1. Install

```bash
cd baby-agi
bun install
```

### 2. Configure (optional)

```bash
cp .env.example .env
# Edit .env and add your OpenAI API key for real AI responses
```

### 3. Run the Dashboard

```bash
bun run dev
```

Open → **http://localhost:3000/dashboard**

### 4. Run Examples

```bash
# Basic function registration and execution
bun run example:basic

# Classic BabyAGI task execution loop (original March 2023 design)
bun run example:classic

# Self-building agent (BabyAGI v2 concept)
bun run example:self-build
```

## Project Structure

```
baby-agi/
├── index.ts                    # Main server entrypoint
├── src/
│   ├── types.ts                # TypeScript interfaces
│   ├── core/
│   │   ├── framework.ts        # Functionz class (core orchestrator)
│   │   ├── execution.ts        # Dynamic sandboxed function executor
│   │   ├── registration.ts     # Function registration API
│   │   └── llm.ts              # OpenAI/LLM client with fallback
│   ├── db/
│   │   ├── sqlite_db.ts        # SQLite persistence (bun:sqlite)
│   │   └── memory_store.ts     # Vector memory + cosine similarity
│   ├── packs/
│   │   ├── index.ts            # Pack loader registry
│   │   ├── default/            # Built-in utility, AI, OS functions
│   │   ├── drafts/             # Self-build, code-writing functions
│   │   └── classic/            # Classic BabyAGI agents + loop runner
│   ├── api/
│   │   └── handlers.ts         # REST API request handlers
│   └── dashboard/
│       ├── server.ts           # Bun HTTP server + routing
│       ├── templates.ts        # HTML page templates (Tailwind)
│       └── static/js/          # Canvas dependency graph
└── examples/
    ├── basic_usage.ts
    ├── classic_loop.ts
    └── self_build.ts
```

## API Reference

### Functions

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/functions` | List all registered functions |
| `GET` | `/api/function/:name` | Get function details |
| `POST` | `/api/function/:name` | Register or update a function |
| `DELETE` | `/api/function/:name` | Delete a function |
| `POST` | `/api/function/:name/run` | Execute a function with args |
| `GET` | `/api/function/:name/versions` | Get version history |
| `POST` | `/api/function/:name/activate-version` | Activate a specific version |

### Agent Loops

| Method | Endpoint | Body |
|---|---|---|
| `POST` | `/api/self-build` | `{ user_description, query_count }` |
| `POST` | `/api/classic-loop` | `{ objective, initial_task, max_iterations }` |

### Keys & System

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/keys` | List all stored secret keys |
| `POST` | `/api/keys` | Add/update a key `{ key_name, value }` |
| `DELETE` | `/api/keys/:name` | Delete a key |
| `GET` | `/api/stats` | System stats |
| `GET` | `/api/graph` | Function dependency graph data |
| `GET` | `/api/logs` | Execution logs (paginated) |

## TypeScript Usage

```typescript
import { Functionz } from "./src";

const babyagi = new Functionz({ dbPath: "babyagi.sqlite" });

// Register a function
babyagi.register_function(
  function circle_area(radius: number) {
    return Math.PI * radius * radius;
  },
  { name: "circle_area", description: "Area of a circle" }
);

// Execute it
const area = await babyagi.executeFunction("circle_area", 5);
console.log(area); // 78.53...

// Run classic task loop
await babyagi.runClassicLoop({
  objective: "Outline a marketing strategy for a B2B SaaS company",
  maxIterations: 5,
});

// Run self-building agent
await babyagi.selfBuild("A data analyst at a logistics company");
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `OPENAI_API_KEY` | — | OpenAI API key (optional; falls back to mock responses) |
| `OPENAI_BASE_URL` | — | Custom LLM API base URL (OpenAI-compatible) |
| `LLM_MODEL` | `gpt-3.5-turbo` | LLM model to use |
| `PORT` | `3000` | HTTP server port |
| `DB_PATH` | `babyagi.sqlite` | Path to SQLite database file |
| `DASHBOARD_ROUTE` | `/dashboard` | Dashboard URL prefix |

## Credits

Inspired by [Yohei Nakajima's BabyAGI](https://github.com/yoheinakajima/babyagi). This is a complete TypeScript/Bun reimplementation of the framework concepts.

## License

MIT

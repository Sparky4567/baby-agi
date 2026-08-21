import type { Functionz } from "../core/framework";
import {
  getBaseLayout,
  renderHomeView,
  renderFunctionsView,
  renderFunctionDetailView,
  renderGraphView,
  renderLogsView,
  renderChatView,
  renderClassicView,
  renderKeysView,
} from "./templates";
import { APIHandlers } from "../api/handlers";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const MIME_MAP: Record<string, string> = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

export function createServer(
  framework: Functionz,
  options: { port?: number; dashboardRoute?: string } = {}
) {
  const port = options.port ?? parseInt(process.env.PORT || "3000", 10);
  const dashboardRoute = options.dashboardRoute ?? "/dashboard";
  const cleanRoute = dashboardRoute.startsWith("/") ? dashboardRoute : `/${dashboardRoute}`;

  const api = new APIHandlers(framework);

  const server = Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);
      const path = url.pathname;
      const method = req.method.toUpperCase();

      // ---------- Static assets ----------
      if (path.startsWith(`${cleanRoute}/static/`)) {
        const relPath = path.replace(`${cleanRoute}/static`, "");
        const fsPath = join(import.meta.dir, "static", relPath);
        if (existsSync(fsPath)) {
          const content = readFileSync(fsPath);
          const ext = extname(fsPath);
          return new Response(content, {
            headers: { "Content-Type": MIME_MAP[ext] || "application/octet-stream" },
          });
        }
        return new Response("Not Found", { status: 404 });
      }

      // ---------- API Routes ----------
      if (path.startsWith("/api/")) {
        let body: any = {};
        if (method === "POST" || method === "PUT" || method === "PATCH") {
          try {
            body = await req.json();
          } catch {}
        }

        // GET /api/functions
        if (path === "/api/functions" && method === "GET") return await api.getFunctions();

        // GET /api/graph
        if (path === "/api/graph" && method === "GET") return await api.getFunctionGraph();

        // GET /api/logs
        if (path === "/api/logs" && method === "GET") return await api.getLogs(url);

        // GET /api/log/:id
        const logMatch = path.match(/^\/api\/log\/([^/]+)$/);
        if (logMatch && method === "GET") return await api.getLog(logMatch[1]);

        // GET /api/stats
        if (path === "/api/stats" && method === "GET") return await api.getStats();

        // GET /api/keys
        if (path === "/api/keys" && method === "GET") return await api.getKeys();

        // POST /api/keys
        if (path === "/api/keys" && method === "POST") return await api.setKey(body);

        // DELETE /api/keys/:name
        const keyDeleteMatch = path.match(/^\/api\/keys\/([^/]+)$/);
        if (keyDeleteMatch && method === "DELETE") return await api.deleteKey(keyDeleteMatch[1]);

        // POST /api/self-build
        if (path === "/api/self-build" && method === "POST") return await api.runSelfBuild(body);

        // POST /api/classic-loop
        if (path === "/api/classic-loop" && method === "POST") return await api.runClassicLoop(body);

        // Function-specific routes
        const fnMatch = path.match(/^\/api\/function\/([^/]+)$/);
        if (fnMatch) {
          const fnName = fnMatch[1];
          if (method === "GET") return await api.getFunction(fnName);
          if (method === "POST") return await api.saveFunction(fnName, body);
          if (method === "DELETE") return await api.deleteFunction(fnName);
        }

        // POST /api/function/:name/run
        const fnRunMatch = path.match(/^\/api\/function\/([^/]+)\/run$/);
        if (fnRunMatch && method === "POST") return await api.runFunction(fnRunMatch[1], body);

        // GET /api/function/:name/versions
        const fnVersionsMatch = path.match(/^\/api\/function\/([^/]+)\/versions$/);
        if (fnVersionsMatch && method === "GET") return await api.getFunctionVersions(fnVersionsMatch[1]);

        // POST /api/function/:name/activate-version
        const fnActivateMatch = path.match(/^\/api\/function\/([^/]+)\/activate-version$/);
        if (fnActivateMatch && method === "POST") return await api.activateFunctionVersion(fnActivateMatch[1], body);

        return Response.json({ error: "API endpoint not found" }, { status: 404 });
      }

      // ---------- Dashboard Routes ----------
      if (path === "/" || path === cleanRoute) {
        const stats = {
          functions: framework.getAllFunctions().length,
          logs: framework.db.getLogCount(),
          keys: framework.getAllKeys().length,
          memory: framework.db.getAllVectors().length,
        };
        const recentLogs = framework.getLogs({ limit: 5 });
        const html = getBaseLayout(
          "Dashboard",
          renderHomeView(stats, recentLogs, cleanRoute),
          "home",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      if (path === `${cleanRoute}/functions`) {
        const functions = framework.getAllFunctions();
        const html = getBaseLayout(
          "Functions",
          renderFunctionsView(functions, cleanRoute),
          "functions",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      // /dashboard/function/:name
      const fnDetailMatch = path.match(new RegExp(`^${cleanRoute}/function/([^/]+)$`));
      if (fnDetailMatch) {
        const fnName = fnDetailMatch[1];
        const func = framework.getFunction(fnName);
        if (!func) {
          return new Response(`Function '${fnName}' not found`, { status: 404 });
        }
        const versions = framework.getFunctionVersions(fnName);
        const logs = framework.getLogs({ function_name: fnName, limit: 20 });
        const html = getBaseLayout(
          `Function: ${fnName}`,
          renderFunctionDetailView(func, versions, logs, cleanRoute),
          "functions",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      if (path === `${cleanRoute}/graph`) {
        const html = getBaseLayout(
          "Dependency Graph",
          renderGraphView(cleanRoute),
          "graph",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      if (path === `${cleanRoute}/logs`) {
        const logs = framework.getLogs({ limit: 100 });
        const html = getBaseLayout(
          "Execution Logs",
          renderLogsView(logs, cleanRoute),
          "logs",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      if (path === `${cleanRoute}/chat`) {
        const html = getBaseLayout(
          "AI Studio & Self-Build",
          renderChatView(cleanRoute),
          "chat",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      if (path === `${cleanRoute}/classic`) {
        const html = getBaseLayout(
          "Classic BabyAGI Loop",
          renderClassicView(cleanRoute),
          "classic",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      if (path === `${cleanRoute}/keys`) {
        const keys = framework.getAllKeys();
        const html = getBaseLayout(
          "API Keys",
          renderKeysView(keys, cleanRoute),
          "keys",
          cleanRoute
        );
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }

      // Root redirect to dashboard
      if (path === "/") {
        return Response.redirect(cleanRoute, 302);
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  return { server, port, dashboardRoute: cleanRoute };
}

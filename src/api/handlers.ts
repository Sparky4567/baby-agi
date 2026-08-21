import type { Functionz } from "../core/framework";

export class APIHandlers {
  private framework: Functionz;

  constructor(framework: Functionz) {
    this.framework = framework;
  }

  public async getFunctions(): Promise<Response> {
    const functions = this.framework.getAllFunctions();
    return Response.json(functions);
  }

  public async getFunction(name: string): Promise<Response> {
    const func = this.framework.getFunction(name);
    if (!func) {
      return Response.json({ error: `Function '${name}' not found` }, { status: 404 });
    }
    return Response.json(func);
  }

  public async saveFunction(name: string, body: any): Promise<Response> {
    try {
      const code = body.code;
      if (!code) {
        return Response.json({ error: "Field 'code' is required" }, { status: 400 });
      }

      const saved = this.framework.registerCode(name, code, {
        description: body.description,
        dependencies: body.dependencies || [],
        imports: body.imports || [],
        key_dependencies: body.key_dependencies || [],
        metadata: body.metadata || {}
      });

      return Response.json(saved);
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  public async deleteFunction(name: string): Promise<Response> {
    const success = this.framework.deleteFunction(name);
    if (!success) {
      return Response.json({ error: `Could not delete function '${name}'` }, { status: 404 });
    }
    return Response.json({ success: true, message: `Function '${name}' deleted` });
  }

  public async runFunction(name: string, body: any): Promise<Response> {
    try {
      const args = Array.isArray(body?.args) ? body.args : (body?.args !== undefined ? [body.args] : []);
      const startTime = performance.now();
      const result = await this.framework.executeFunction(name, ...args);
      const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

      return Response.json({
        success: true,
        function_name: name,
        args,
        result,
        execution_time_ms: durationMs
      });
    } catch (err: any) {
      return Response.json({
        success: false,
        function_name: name,
        error: err.message,
        stack: err.stack
      }, { status: 500 });
    }
  }

  public async getFunctionVersions(name: string): Promise<Response> {
    const versions = this.framework.getFunctionVersions(name);
    return Response.json(versions);
  }

  public async activateFunctionVersion(name: string, body: any): Promise<Response> {
    const version = body?.version;
    if (typeof version !== "number") {
      return Response.json({ error: "Field 'version' (number) is required" }, { status: 400 });
    }

    const ok = this.framework.activateFunctionVersion(name, version);
    if (!ok) {
      return Response.json({ error: `Version ${version} for function '${name}' not found` }, { status: 404 });
    }

    return Response.json({ success: true, message: `Activated version ${version} for ${name}` });
  }

  public async getLogs(url: URL): Promise<Response> {
    const fnName = url.searchParams.get("function_name") || undefined;
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    const logs = this.framework.getLogs({ function_name: fnName, limit, offset });
    const total = this.framework.db.getLogCount();
    return Response.json({ logs, total, limit, offset });
  }

  public async getLog(logId: string): Promise<Response> {
    const log = this.framework.getLog(logId);
    if (!log) {
      return Response.json({ error: `Log '${logId}' not found` }, { status: 404 });
    }
    const tree = this.framework.getLogTree(logId);
    return Response.json({ log, tree });
  }

  public async getFunctionGraph(): Promise<Response> {
    const functions = this.framework.getAllFunctions();
    const nodes = functions.map((f) => ({
      id: f.name,
      label: f.name,
      category: f.metadata?.category || "general",
      version: f.version,
      description: f.description
    }));

    const edges: Array<{ source: string; target: string }> = [];
    for (const f of functions) {
      if (f.dependencies && Array.isArray(f.dependencies)) {
        for (const dep of f.dependencies) {
          edges.push({ source: f.name, target: dep });
        }
      }
    }

    return Response.json({ nodes, edges });
  }

  public async getKeys(): Promise<Response> {
    const keys = this.framework.getAllKeys();
    return Response.json(keys);
  }

  public async setKey(body: any): Promise<Response> {
    const { key_name, value } = body || {};
    if (!key_name || !value) {
      return Response.json({ error: "Fields 'key_name' and 'value' are required" }, { status: 400 });
    }
    this.framework.setKey(key_name, value);
    return Response.json({ success: true, message: `Key '${key_name}' saved` });
  }

  public async deleteKey(keyName: string): Promise<Response> {
    const ok = this.framework.db.deleteKey(keyName);
    return Response.json({ success: ok });
  }

  public async runSelfBuild(body: any): Promise<Response> {
    const userDescription = body?.user_description || body?.description;
    if (!userDescription) {
      return Response.json({ error: "Field 'user_description' is required" }, { status: 400 });
    }

    try {
      const result = await this.framework.selfBuild({
        userDescription,
        queryCount: body?.query_count || 3
      });
      return Response.json({ success: true, result });
    } catch (err: any) {
      return Response.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  public async runClassicLoop(body: any): Promise<Response> {
    const objective = body?.objective;
    if (!objective) {
      return Response.json({ error: "Field 'objective' is required" }, { status: 400 });
    }

    try {
      const result = await this.framework.runClassicLoop({
        objective,
        initialTask: body?.initial_task,
        maxIterations: body?.max_iterations || 3
      });
      return Response.json({ success: true, result });
    } catch (err: any) {
      return Response.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  public async getStats(): Promise<Response> {
    const allFuncs = this.framework.getAllFunctions();
    const logCount = this.framework.db.getLogCount();
    const keys = this.framework.getAllKeys();
    const vectors = this.framework.db.getAllVectors();

    return Response.json({
      functions_count: allFuncs.length,
      logs_count: logCount,
      keys_count: keys.length,
      memory_items_count: vectors.length
    });
  }
}

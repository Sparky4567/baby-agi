export function getBaseLayout(title: string, content: string, activeTab: string = "home", dashboardRoute: string = "/dashboard"): string {
  const route = (path: string) => {
    const cleanBase = dashboardRoute.startsWith("/") ? dashboardRoute : `/${dashboardRoute}`;
    return path === "/" ? cleanBase : `${cleanBase}${path}`;
  };

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | BabyAGI Bun</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f5f3ff',
              100: '#ede9fe',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              900: '#4c1d95',
            }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      background-color: #0b0f19;
      color: #e2e8f0;
    }
    code, pre {
      font-family: 'JetBrains Mono', monospace;
    }
    .glass-panel {
      background: rgba(17, 24, 39, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glow-effect {
      box-shadow: 0 0 25px -5px rgba(124, 58, 237, 0.25);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <!-- Top Navigation -->
  <header class="sticky top-0 z-50 glass-panel border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-3">
          <a href="${route('/')}" class="flex items-center space-x-2.5">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
              ⚡
            </div>
            <div>
              <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">BabyAGI</span>
              <span class="text-xs ml-1.5 px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono">bun</span>
            </div>
          </a>
        </div>

        <nav class="hidden md:flex space-x-1">
          <a href="${route('/')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'home' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            Dashboard
          </a>
          <a href="${route('/functions')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'functions' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            Functions
          </a>
          <a href="${route('/graph')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'graph' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            Graph
          </a>
          <a href="${route('/logs')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'logs' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            Logs
          </a>
          <a href="${route('/chat')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'chat' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            AI Studio & Self-Build
          </a>
          <a href="${route('/classic')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'classic' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            Classic Loop
          </a>
          <a href="${route('/keys')}" class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'keys' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}">
            Keys & Settings
          </a>
        </nav>

        <div class="flex items-center space-x-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
            <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
    ${content}
  </main>

  <!-- Footer -->
  <footer class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
    <p>BabyAGI TypeScript / Bun Framework &copy; 2026. Inspired by <a href="https://github.com/yoheinakajima/babyagi" target="_blank" class="text-purple-400 hover:underline">Yohei Nakajima's BabyAGI</a>.</p>
  </footer>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>`;
}

export function renderHomeView(stats: { functions: number; logs: number; keys: number; memory: number }, recentLogs: any[], dashboardRoute: string): string {
  return `
    <div class="space-y-8">
      <!-- Hero Banner -->
      <div class="glass-panel glow-effect rounded-2xl p-8 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-indigo-950/40 border border-purple-800/30">
        <div class="max-w-3xl">
          <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Self-Building Autonomous AI Framework
          </h1>
          <p class="mt-3 text-slate-300 text-base sm:text-lg">
            Store, manage, synthesize, and execute dynamic functions from SQLite with full dependency tracking, sandboxed execution, and autonomous task execution.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="${dashboardRoute}/chat" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-600/30 transition flex items-center gap-2">
              <span>⚡</span> Run Self-Building Agent
            </a>
            <a href="${dashboardRoute}/classic" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition flex items-center gap-2">
              <span>🔄</span> Run Classic Task Loop
            </a>
            <a href="${dashboardRoute}/functions" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700 transition">
              Explore Functions
            </a>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="glass-panel p-6 rounded-xl border border-slate-800">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Functions</p>
            <span class="p-2 rounded-lg bg-purple-950 text-purple-400 border border-purple-800/50">⚡</span>
          </div>
          <p class="mt-4 text-3xl font-bold text-white">${stats.functions}</p>
          <p class="mt-1 text-xs text-slate-400">Available in SQLite registry</p>
        </div>

        <div class="glass-panel p-6 rounded-xl border border-slate-800">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Execution Traces</p>
            <span class="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800/50">📊</span>
          </div>
          <p class="mt-4 text-3xl font-bold text-white">${stats.logs}</p>
          <p class="mt-1 text-xs text-slate-400">Total function executions</p>
        </div>

        <div class="glass-panel p-6 rounded-xl border border-slate-800">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vector Memory</p>
            <span class="p-2 rounded-lg bg-pink-950 text-pink-400 border border-pink-800/50">🧠</span>
          </div>
          <p class="mt-4 text-3xl font-bold text-white">${stats.memory}</p>
          <p class="mt-1 text-xs text-slate-400">Context items stored</p>
        </div>

        <div class="glass-panel p-6 rounded-xl border border-slate-800">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Configured Keys</p>
            <span class="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">🔑</span>
          </div>
          <p class="mt-4 text-3xl font-bold text-white">${stats.keys}</p>
          <p class="mt-1 text-xs text-slate-400">API secrets stored</p>
        </div>
      </div>

      <!-- Recent Executions -->
      <div class="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Recent Execution Logs</h2>
          <a href="${dashboardRoute}/logs" class="text-sm text-purple-400 hover:text-purple-300">View all &rarr;</a>
        </div>
        <div class="divide-y divide-slate-800/60">
          ${
            recentLogs.length === 0
              ? `<div class="p-8 text-center text-slate-500 text-sm">No executions logged yet. Run a function or task to see traces here.</div>`
              : recentLogs
                  .slice(0, 5)
                  .map(
                    (log) => `
            <div class="p-4 sm:px-6 hover:bg-slate-800/30 transition flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="w-2 h-2 rounded-full ${log.error ? 'bg-rose-500' : 'bg-emerald-500'}"></span>
                <div>
                  <a href="${dashboardRoute}/function/${log.function_name}" class="font-mono text-sm font-semibold text-purple-300 hover:underline">
                    ${log.function_name}
                  </a>
                  <p class="text-xs text-slate-500">${new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-xs font-mono text-slate-400">${log.execution_time_ms} ms</span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  log.error
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }">
                  ${log.error ? 'Error' : 'Success'}
                </span>
              </div>
            </div>
          `
                  )
                  .join("")
          }
        </div>
      </div>
    </div>
  `;
}

export function renderFunctionsView(functions: any[], dashboardRoute: string): string {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">Function Registry</h1>
          <p class="text-sm text-slate-400">Browse and manage registered autonomous tools & functions</p>
        </div>
        <button onclick="openNewFunctionModal()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition shadow-lg shadow-purple-600/30 flex items-center gap-2">
          <span>+</span> Register New Function
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <input type="text" id="fnSearchInput" oninput="filterFunctions()" placeholder="Search functions by name or description..." class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500">
      </div>

      <!-- Functions Grid -->
      <div id="functionsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${functions
          .map(
            (f) => `
          <div class="function-card glass-panel rounded-xl p-5 border border-slate-800 hover:border-purple-700/50 transition flex flex-col justify-between" data-name="${f.name}" data-desc="${f.description || ''}">
            <div>
              <div class="flex items-start justify-between">
                <a href="${dashboardRoute}/function/${f.name}" class="font-mono text-base font-bold text-purple-300 hover:text-purple-200 hover:underline">
                  ${f.name}
                </a>
                <span class="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">v${f.version}</span>
              </div>
              <p class="mt-2 text-sm text-slate-400 line-clamp-2">
                ${f.description || 'No description provided.'}
              </p>
              
              ${f.dependencies && f.dependencies.length > 0 ? `
                <div class="mt-3 flex flex-wrap gap-1.5">
                  ${f.dependencies.map((dep: string) => `<span class="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-xs font-mono border border-indigo-800">dep: ${dep}</span>`).join('')}
                </div>
              ` : ''}

              ${f.key_dependencies && f.key_dependencies.length > 0 ? `
                <div class="mt-2 flex flex-wrap gap-1.5">
                  ${f.key_dependencies.map((key: string) => `<span class="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-xs font-mono border border-amber-800">key: ${key}</span>`).join('')}
                </div>
              ` : ''}
            </div>

            <div class="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <a href="${dashboardRoute}/function/${f.name}" class="text-xs text-slate-400 hover:text-white">View Code & Details &rarr;</a>
              <button onclick="quickRunFunction('${f.name}')" class="px-3 py-1 text-xs rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 font-medium border border-purple-700/50 transition">
                ▶ Run
              </button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <!-- Quick Run Modal -->
    <div id="quickRunModal" class="hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl">
        <h3 class="text-lg font-bold text-white" id="modalFnTitle">Execute Function</h3>
        <p class="text-xs text-slate-400 mt-1">Provide JSON arguments to pass into the function.</p>
        <div class="mt-4">
          <label class="block text-xs font-medium text-slate-300 mb-1">Arguments (JSON Array or single value)</label>
          <textarea id="modalArgsInput" rows="4" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 font-mono text-sm text-white focus:outline-none focus:border-purple-500" placeholder="[] or [&quot;param1&quot;, 42]"></textarea>
        </div>
        <div class="mt-4 hidden" id="modalResultContainer">
          <label class="block text-xs font-medium text-slate-300 mb-1">Output Result</label>
          <pre id="modalResultOutput" class="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto max-h-48"></pre>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button onclick="closeQuickRunModal()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium">Cancel</button>
          <button onclick="submitQuickRun()" id="modalSubmitBtn" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-600/30">Run Function</button>
        </div>
      </div>
    </div>

    <!-- Register New Function Modal -->
    <div id="newFnModal" class="hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
        <h3 class="text-lg font-bold text-white">Register New Function</h3>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Function Name</label>
          <input type="text" id="newFnName" placeholder="my_custom_tool" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-mono text-sm text-white focus:outline-none focus:border-purple-500">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Description</label>
          <input type="text" id="newFnDesc" placeholder="Performs a specific task..." class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Dependencies (comma separated)</label>
          <input type="text" id="newFnDeps" placeholder="circle_area, gpt_call" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">JavaScript Code</label>
          <textarea id="newFnCode" rows="8" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 font-mono text-sm text-white focus:outline-none focus:border-purple-500" placeholder="async function my_custom_tool(arg1) {\n  return 'Result: ' + arg1;\n}"></textarea>
        </div>
        <div class="flex justify-end space-x-3 pt-2">
          <button onclick="closeNewFunctionModal()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium">Cancel</button>
          <button onclick="submitNewFunction()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-600/30">Save Function</button>
        </div>
      </div>
    </div>

    <script>
      let currentModalFn = '';
      function filterFunctions() {
        const query = document.getElementById('fnSearchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.function-card');
        cards.forEach(card => {
          const name = card.dataset.name.toLowerCase();
          const desc = card.dataset.desc.toLowerCase();
          if (name.includes(query) || desc.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }

      function quickRunFunction(name) {
        currentModalFn = name;
        document.getElementById('modalFnTitle').innerText = 'Execute: ' + name;
        document.getElementById('modalArgsInput').value = '[]';
        document.getElementById('modalResultContainer').classList.add('hidden');
        document.getElementById('quickRunModal').classList.remove('hidden');
      }

      function closeQuickRunModal() {
        document.getElementById('quickRunModal').classList.add('hidden');
      }

      async function submitQuickRun() {
        const btn = document.getElementById('modalSubmitBtn');
        btn.innerText = 'Running...';
        btn.disabled = true;

        let args = [];
        try {
          args = JSON.parse(document.getElementById('modalArgsInput').value || '[]');
        } catch {
          args = [document.getElementById('modalArgsInput').value];
        }

        try {
          const resp = await fetch('/api/function/' + currentModalFn + '/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ args })
          });
          const data = await resp.json();
          document.getElementById('modalResultContainer').classList.remove('hidden');
          document.getElementById('modalResultOutput').innerText = JSON.stringify(data, null, 2);
        } catch (err) {
          alert('Execution failed: ' + err.message);
        } finally {
          btn.innerText = 'Run Function';
          btn.disabled = false;
        }
      }

      function openNewFunctionModal() {
        document.getElementById('newFnModal').classList.remove('hidden');
      }

      function closeNewFunctionModal() {
        document.getElementById('newFnModal').classList.add('hidden');
      }

      async function submitNewFunction() {
        const name = document.getElementById('newFnName').value.trim();
        const desc = document.getElementById('newFnDesc').value.trim();
        const code = document.getElementById('newFnCode').value.trim();
        const deps = document.getElementById('newFnDeps').value.split(',').map(s => s.trim()).filter(Boolean);

        if (!name || !code) {
          alert('Name and code are required');
          return;
        }

        try {
          const resp = await fetch('/api/function/' + name, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: desc, code, dependencies: deps })
          });
          const res = await resp.json();
          if (res.error) {
            alert('Error: ' + res.error);
          } else {
            window.location.reload();
          }
        } catch (err) {
          alert('Failed to save function: ' + err.message);
        }
      }
    </script>
  `;
}

export function renderFunctionDetailView(func: any, versions: any[], logs: any[], dashboardRoute: string): string {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <a href="${dashboardRoute}/functions" class="text-xs text-purple-400 hover:underline">&larr; Back to Functions</a>
          <h1 class="text-2xl font-mono font-bold text-white mt-1">${func.name}</h1>
          <p class="text-sm text-slate-400">${func.description || 'No description'}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-mono border border-purple-800">
            Active Version: v${func.version}
          </span>
          <button onclick="deleteFunction('${func.name}')" class="px-3 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-medium border border-rose-800 transition">
            Delete
          </button>
        </div>
      </div>

      <!-- Code Editor & Runner Split -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Code Editor -->
        <div class="lg:col-span-2 glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Source Code</h2>
            <button onclick="updateFunctionCode()" class="px-3 py-1 text-xs rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium shadow transition">
              Save New Version
            </button>
          </div>
          <textarea id="editFnCode" rows="16" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-emerald-300 focus:outline-none focus:border-purple-500">${func.code}</textarea>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div>
              <span class="font-semibold text-slate-300">Dependencies:</span>
              <p class="font-mono text-indigo-400">${(func.dependencies || []).join(', ') || 'None'}</p>
            </div>
            <div>
              <span class="font-semibold text-slate-300">Secret Keys:</span>
              <p class="font-mono text-amber-400">${(func.key_dependencies || []).join(', ') || 'None'}</p>
            </div>
          </div>
        </div>

        <!-- Interactive Runner & Version History -->
        <div class="space-y-6">
          <!-- Runner Box -->
          <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
            <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Test Runner</h2>
            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">Input Arguments (JSON)</label>
              <textarea id="testArgs" rows="3" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-mono text-xs text-white focus:outline-none focus:border-purple-500" placeholder="[]"></textarea>
            </div>
            <button onclick="runTest()" id="testRunBtn" class="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition">
              Execute Function
            </button>
            <div id="testOutputContainer" class="hidden space-y-1 pt-2 border-t border-slate-800">
              <span class="text-xs text-slate-400 font-medium">Output:</span>
              <pre id="testOutput" class="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 max-h-40 overflow-auto"></pre>
            </div>
          </div>

          <!-- Version History -->
          <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
            <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Version History</h2>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              ${versions
                .map(
                  (v) => `
                <div class="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span class="font-mono font-bold ${v.version === func.version ? 'text-purple-400' : 'text-slate-400'}">v${v.version}</span>
                    <span class="text-slate-500 ml-2">${new Date(v.created_at).toLocaleDateString()}</span>
                  </div>
                  ${
                    v.version === func.version
                      ? `<span class="text-emerald-400 text-xs">Active</span>`
                      : `<button onclick="activateVersion(${v.version})" class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Activate</button>`
                  }
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      async function runTest() {
        const btn = document.getElementById('testRunBtn');
        btn.innerText = 'Executing...';
        btn.disabled = true;

        let args = [];
        try {
          args = JSON.parse(document.getElementById('testArgs').value || '[]');
        } catch {
          args = [document.getElementById('testArgs').value];
        }

        try {
          const resp = await fetch('/api/function/${func.name}/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ args })
          });
          const data = await resp.json();
          document.getElementById('testOutputContainer').classList.remove('hidden');
          document.getElementById('testOutput').innerText = JSON.stringify(data, null, 2);
        } catch (err) {
          alert('Execution error: ' + err.message);
        } finally {
          btn.innerText = 'Execute Function';
          btn.disabled = false;
        }
      }

      async function updateFunctionCode() {
        const code = document.getElementById('editFnCode').value.trim();
        try {
          const resp = await fetch('/api/function/${func.name}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              description: "${func.description || ''}",
              dependencies: ${JSON.stringify(func.dependencies || [])}
            })
          });
          const data = await resp.json();
          if (data.error) {
            alert('Error: ' + data.error);
          } else {
            alert('Saved new version!');
            window.location.reload();
          }
        } catch (err) {
          alert('Failed to update: ' + err.message);
        }
      }

      async function activateVersion(version) {
        try {
          const resp = await fetch('/api/function/${func.name}/activate-version', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ version })
          });
          const data = await resp.json();
          if (data.error) alert('Error: ' + data.error);
          else window.location.reload();
        } catch (err) {
          alert('Failed to activate version: ' + err.message);
        }
      }

      async function deleteFunction(name) {
        if (!confirm('Are you sure you want to delete function ' + name + '?')) return;
        try {
          await fetch('/api/function/' + name, { method: 'DELETE' });
          window.location.href = '${dashboardRoute}/functions';
        } catch (err) {
          alert('Failed to delete: ' + err.message);
        }
      }
    </script>
  `;
}

export function renderGraphView(dashboardRoute: string): string {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">Dependency Graph</h1>
          <p class="text-sm text-slate-400">Visual mapping of registered functions and inter-function dependencies</p>
        </div>
        <button onclick="loadGraphData()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700">
          🔄 Refresh Graph
        </button>
      </div>

      <div class="glass-panel rounded-xl p-6 border border-slate-800">
        <canvas id="graphCanvas" width="1000" height="600" class="w-full h-[600px] bg-slate-950 rounded-lg"></canvas>
      </div>
    </div>

    <script src="${dashboardRoute}/static/js/function_graph.js"></script>
  `;
}

export function renderLogsView(logs: any[], dashboardRoute: string): string {
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Execution Logs & Traces</h1>
        <p class="text-sm text-slate-400">Audit trail of dynamic function calls, timings, inputs and outputs</p>
      </div>

      <div class="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
              <tr>
                <th class="p-3.5 pl-6">Function</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5">Duration</th>
                <th class="p-3.5">Timestamp</th>
                <th class="p-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 font-mono">
              ${logs
                .map(
                  (log) => `
                <tr class="hover:bg-slate-800/30 transition">
                  <td class="p-3.5 pl-6 font-bold text-purple-300">
                    ${log.function_name} <span class="text-slate-500 font-normal">v${log.version}</span>
                  </td>
                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded text-[11px] font-sans font-medium ${
                      log.error
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }">
                      ${log.error ? 'Failed' : 'Success'}
                    </span>
                  </td>
                  <td class="p-3.5 text-slate-400">${log.execution_time_ms} ms</td>
                  <td class="p-3.5 text-slate-500">${new Date(log.timestamp).toLocaleString()}</td>
                  <td class="p-3.5 pr-6 text-right">
                    <button onclick='viewLogModal(${JSON.stringify(JSON.stringify(log))})' class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-sans">
                      Inspect
                    </button>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Log Inspector Modal -->
    <div id="logDetailModal" class="hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-white" id="logModalTitle">Log Inspector</h3>
          <button onclick="closeLogModal()" class="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase mb-1">Details</label>
          <pre id="logModalContent" class="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 max-h-96 overflow-auto"></pre>
        </div>
      </div>
    </div>

    <script>
      function viewLogModal(logStr) {
        const log = JSON.parse(logStr);
        document.getElementById('logModalTitle').innerText = 'Trace: ' + log.function_name + ' (' + log.log_id.slice(0, 8) + ')';
        document.getElementById('logModalContent').innerText = JSON.stringify(log, null, 2);
        document.getElementById('logDetailModal').classList.remove('hidden');
      }

      function closeLogModal() {
        document.getElementById('logDetailModal').classList.add('hidden');
      }
    </script>
  `;
}

export function renderChatView(dashboardRoute: string): string {
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-white">AI Studio & Self-Building Agent</h1>
        <p class="text-sm text-slate-400">Instruct BabyAGI with a persona or goal to synthesize missing tools and execute them dynamically</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Input Form -->
        <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
          <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Self-Build Prompt</h2>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">User Persona or Goal</label>
            <textarea id="selfBuildDesc" rows="4" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500" placeholder="e.g. A growth marketer at an enterprise SaaS company looking to optimize conversion funnels."></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Number of Queries to Generate</label>
            <input type="number" id="selfBuildCount" value="3" min="1" max="10" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500">
          </div>
          <button onclick="startSelfBuild()" id="selfBuildBtn" class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2">
            <span>⚡</span> Synthesize & Build Tools
          </button>
        </div>

        <!-- Right: Execution Stream -->
        <div class="lg:col-span-2 glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
          <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Live Agent Log Stream</h2>
          <div id="agentStreamOutput" class="h-96 bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-2">
            <p class="text-slate-600">// Agent output will appear here in real-time...</p>
          </div>
        </div>
      </div>
    </div>

    <script>
      async function startSelfBuild() {
        const desc = document.getElementById('selfBuildDesc').value.trim();
        const count = parseInt(document.getElementById('selfBuildCount').value || '3', 10);
        if (!desc) {
          alert('Please enter a user persona or goal.');
          return;
        }

        const btn = document.getElementById('selfBuildBtn');
        const stream = document.getElementById('agentStreamOutput');
        btn.innerText = 'Synthesizing...';
        btn.disabled = true;

        stream.innerHTML = '<p class="text-purple-400">⚡ Starting Self-Building Agent loop...</p>';
        stream.innerHTML += '<p class="text-slate-400">> Objective: ' + desc + '</p>';

        try {
          const resp = await fetch('/api/self-build', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_description: desc, query_count: count })
          });
          const data = await resp.json();

          if (data.success) {
            stream.innerHTML += '<p class="text-emerald-400 font-bold">✓ Self-Build completed successfully!</p>';
            data.result.results.forEach((item, idx) => {
              stream.innerHTML += '<div class="p-3 my-2 rounded bg-slate-900 border border-slate-800 text-xs">' +
                '<p class="text-indigo-300 font-bold">Query ' + (idx + 1) + ': ' + item.query + '</p>' +
                '<p class="text-slate-400">Action: <span class="text-amber-300">' + item.decision.action + '</span> (' + (item.decision.function_name || 'N/A') + ')</p>' +
                '<p class="text-emerald-300 mt-1">Result: ' + JSON.stringify(item.executionResult) + '</p>' +
                '</div>';
            });
          } else {
            stream.innerHTML += '<p class="text-rose-400">Error: ' + data.error + '</p>';
          }
        } catch (err) {
          stream.innerHTML += '<p class="text-rose-400">Failed to run self build: ' + err.message + '</p>';
        } finally {
          btn.innerText = '⚡ Synthesize & Build Tools';
          btn.disabled = false;
        }
      }
    </script>
  `;
}

export function renderClassicView(dashboardRoute: string): string {
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Classic BabyAGI Task Planner</h1>
        <p class="text-sm text-slate-400">The autonomous task execution, creation, and prioritization loop</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
          <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Goal Configuration</h2>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">High-Level Objective</label>
            <textarea id="classicObjective" rows="4" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500" placeholder="e.g. Write a comprehensive guide on launching a developer-first SaaS product."></textarea>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Initial Task</label>
            <input type="text" id="classicInitialTask" value="Develop a comprehensive task list and plan of execution." class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Max Iterations</label>
            <input type="number" id="classicIterations" value="3" min="1" max="10" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500">
          </div>
          <button onclick="startClassicLoop()" id="classicRunBtn" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2">
            <span>🔄</span> Run Autonomous Loop
          </button>
        </div>

        <div class="lg:col-span-2 glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
          <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Autonomous Execution Feed</h2>
          <div id="classicFeedOutput" class="h-96 bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-3">
            <p class="text-slate-600">// Task execution steps will stream here...</p>
          </div>
        </div>
      </div>
    </div>

    <script>
      async function startClassicLoop() {
        const obj = document.getElementById('classicObjective').value.trim();
        const initialTask = document.getElementById('classicInitialTask').value.trim();
        const iters = parseInt(document.getElementById('classicIterations').value || '3', 10);

        if (!obj) {
          alert('Please enter a goal objective');
          return;
        }

        const btn = document.getElementById('classicRunBtn');
        const feed = document.getElementById('classicFeedOutput');
        btn.innerText = 'Running Loop...';
        btn.disabled = true;

        feed.innerHTML = '<p class="text-indigo-400 font-bold">🔄 Starting BabyAGI Autonomous Task Loop...</p>';
        feed.innerHTML += '<p class="text-slate-400">> Objective: ' + obj + '</p>';

        try {
          const resp = await fetch('/api/classic-loop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ objective: obj, initial_task: initialTask, max_iterations: iters })
          });
          const data = await resp.json();

          if (data.success) {
            feed.innerHTML += '<p class="text-emerald-400 font-bold mt-2">✓ Autonomous Loop finished ' + data.result.completedIterations + ' iterations!</p>';
            data.result.history.forEach((h, idx) => {
              feed.innerHTML += '<div class="p-3 my-2 rounded bg-slate-900 border border-slate-800 text-xs">' +
                '<p class="text-purple-300 font-bold">Task ' + (idx + 1) + ': ' + h.task.task_name + '</p>' +
                '<p class="text-slate-300 mt-1 whitespace-pre-wrap font-sans">' + h.result + '</p>' +
                '</div>';
            });
          } else {
            feed.innerHTML += '<p class="text-rose-400">Error: ' + data.error + '</p>';
          }
        } catch (err) {
          feed.innerHTML += '<p class="text-rose-400">Failed: ' + err.message + '</p>';
        } finally {
          btn.innerText = '🔄 Run Autonomous Loop';
          btn.disabled = false;
        }
      }
    </script>
  `;
}

export function renderKeysView(keys: any[], dashboardRoute: string): string {
  return `
    <div class="space-y-6 max-w-4xl">
      <div>
        <h1 class="text-2xl font-bold text-white">API Keys & Environment Secrets</h1>
        <p class="text-sm text-slate-400">Manage credentials for external AI APIs and integrations</p>
      </div>

      <div class="glass-panel rounded-xl p-6 border border-slate-800 space-y-4">
        <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Add or Update Secret Key</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Key Name</label>
            <input type="text" id="secretKeyName" placeholder="openai_api_key" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-mono text-sm text-white focus:outline-none focus:border-purple-500">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Key Value</label>
            <input type="password" id="secretKeyValue" placeholder="sk-..." class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-mono text-sm text-white focus:outline-none focus:border-purple-500">
          </div>
        </div>
        <button onclick="saveSecretKey()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-600/30 transition">
          Save Secret Key
        </button>
      </div>

      <div class="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800">
          <h2 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Configured Secrets</h2>
        </div>
        <div class="divide-y divide-slate-800/60">
          ${keys.length === 0 ? `<div class="p-6 text-center text-slate-500 text-xs">No secret keys saved in database.</div>` : keys.map(k => `
            <div class="p-4 sm:px-6 flex items-center justify-between">
              <div>
                <p class="font-mono text-sm font-bold text-amber-400">${k.key_name}</p>
                <p class="text-xs text-slate-500">Last updated: ${new Date(k.updated_at).toLocaleString()}</p>
              </div>
              <button onclick="deleteSecretKey('${k.key_name}')" class="px-3 py-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-medium border border-rose-800">
                Delete
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <script>
      async function saveSecretKey() {
        const name = document.getElementById('secretKeyName').value.trim();
        const value = document.getElementById('secretKeyValue').value.trim();
        if (!name || !value) {
          alert('Both key name and value are required.');
          return;
        }

        try {
          const resp = await fetch('/api/keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key_name: name, value })
          });
          const data = await resp.json();
          if (data.success) window.location.reload();
          else alert('Error: ' + data.error);
        } catch (err) {
          alert('Failed to save: ' + err.message);
        }
      }

      async function deleteSecretKey(name) {
        if (!confirm('Delete key ' + name + '?')) return;
        try {
          await fetch('/api/keys/' + name, { method: 'DELETE' });
          window.location.reload();
        } catch (err) {
          alert('Failed to delete: ' + err.message);
        }
      }
    </script>
  `;
}

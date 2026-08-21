/**
 * Function Dependency Graph - rendered on HTML5 Canvas
 * Fetches /api/graph and draws nodes + directed edges
 */

async function loadGraphData() {
  try {
    const resp = await fetch('/api/graph');
    const { nodes, edges } = await resp.json();
    drawGraph(nodes, edges);
  } catch (err) {
    console.error('Failed to load graph data:', err);
  }
}

function drawGraph(nodes, edges) {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  if (nodes.length === 0) {
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No functions registered yet.', W / 2, H / 2);
    return;
  }

  // Assign positions using force-directed-like radial layout
  const categoryColors = {
    'utility': '#a78bfa',
    'math': '#34d399',
    'ai': '#f472b6',
    'os': '#fb923c',
    'self_build': '#60a5fa',
    'classic_babyagi': '#facc15',
    'self_built': '#4ade80',
    'general': '#94a3b8',
  };

  const angleStep = (2 * Math.PI) / nodes.length;
  const radius = Math.min(W, H) * 0.35;
  const centerX = W / 2;
  const centerY = H / 2;

  const positions = {};
  nodes.forEach((node, i) => {
    const angle = i * angleStep - Math.PI / 2;
    positions[node.id] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      node
    };
  });

  // Draw edges first
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  edges.forEach(edge => {
    const src = positions[edge.source];
    const tgt = positions[edge.target];
    if (!src || !tgt) return;

    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    ctx.lineTo(tgt.x, tgt.y);
    ctx.stroke();

    // Arrowhead
    const angle = Math.atan2(tgt.y - src.y, tgt.x - src.x);
    const arrowSize = 8;
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(tgt.x, tgt.y);
    ctx.lineTo(
      tgt.x - arrowSize * Math.cos(angle - Math.PI / 7),
      tgt.y - arrowSize * Math.sin(angle - Math.PI / 7)
    );
    ctx.lineTo(
      tgt.x - arrowSize * Math.cos(angle + Math.PI / 7),
      tgt.y - arrowSize * Math.sin(angle + Math.PI / 7)
    );
    ctx.closePath();
    ctx.fill();
  });

  // Draw nodes
  nodes.forEach(node => {
    const pos = positions[node.id];
    const color = categoryColors[node.category] || categoryColors['general'];
    const nodeRadius = 22;

    // Glow
    const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeRadius * 2);
    gradient.addColorStop(0, color + '33');
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, nodeRadius * 1.8, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Circle
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Name label
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Truncate long names
    const label = node.label.length > 14 ? node.label.slice(0, 12) + '…' : node.label;
    ctx.fillText(label, pos.x, pos.y);

    // Version badge below
    ctx.fillStyle = color + 'aa';
    ctx.font = '9px Inter, sans-serif';
    ctx.fillText('v' + node.version, pos.x, pos.y + nodeRadius + 10);
  });
}

window.addEventListener('DOMContentLoaded', loadGraphData);

// Vercel Edge Function — Ollama API proxy for gemma4:e4b
// Translates Anthropic-format requests → Ollama → Anthropic-format responses.
// Deploy: set OLLAMA_BASE_URL in Vercel project environment variables (e.g. http://your-server:11434).

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ollamaBase = process.env.OLLAMA_BASE_URL;
  if (!ollamaBase) {
    return new Response(JSON.stringify({ error: 'OLLAMA_BASE_URL not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }

  // Build Ollama OpenAI-compatible request from Anthropic-format body
  const messages = [];
  if (body.system) {
    messages.push({ role: 'system', content: body.system });
  }
  for (const m of body.messages || []) {
    messages.push({ role: m.role, content: m.content });
  }

  const ollamaBody = {
    model: body.model || 'gemma4:e4b',
    messages,
    stream: false,
    options: {
      num_predict: body.max_tokens || 1000,
    },
  };

  const upstream = await fetch(`${ollamaBase}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ollamaBody),
  });

  if (!upstream.ok) {
    const err = await upstream.text();
    return new Response(JSON.stringify({ error: `Ollama error: ${err}` }), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }

  const data = await upstream.json();
  const text = data.message?.content ?? '';

  // Return in Anthropic-compatible format so the frontend needs no changes
  const anthropicShape = {
    content: [{ type: 'text', text }],
    model: ollamaBody.model,
    role: 'assistant',
  };

  return new Response(JSON.stringify(anthropicShape), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

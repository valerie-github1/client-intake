// Vercel Edge Function — Ollama API proxy for gemma4:e4b
// Translates Anthropic-format requests → Ollama → Anthropic-format responses.
// Deploy: set OLLAMA_BASE_URL and optionally OLLAMA_SECRET in Vercel env vars.
// If OLLAMA_SECRET is set, callers must send: x-ollama-secret: <value>

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-ollama-secret',
};

const OLLAMA_MODEL = 'gemma4:e4b';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }

  const ollamaBase = process.env.OLLAMA_BASE_URL;
  if (!ollamaBase) {
    return new Response(JSON.stringify({ error: 'OLLAMA_BASE_URL not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }

  // Optional shared-secret auth — set OLLAMA_SECRET in Vercel env vars to protect the endpoint
  const expectedSecret = process.env.OLLAMA_SECRET;
  if (expectedSecret && req.headers.get('x-ollama-secret') !== expectedSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
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

  // Build Ollama request from Anthropic-format body.
  // Always use OLLAMA_MODEL — ignore body.model which may contain an Anthropic model ID.
  const messages = [];
  if (body.system) {
    messages.push({ role: 'system', content: body.system });
  }
  for (const m of body.messages || []) {
    messages.push({ role: m.role, content: m.content });
  }

  const ollamaBody = {
    model: OLLAMA_MODEL,
    messages,
    stream: false,
    options: {
      num_predict: body.max_tokens || 1000,
    },
  };

  let text;
  try {
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
    text = data.message?.content ?? '';
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to reach Ollama upstream' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }

  // Return in Anthropic-compatible format so the existing frontend needs no changes
  return new Response(JSON.stringify({
    content: [{ type: 'text', text }],
    model: OLLAMA_MODEL,
    role: 'assistant',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

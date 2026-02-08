interface Env {}

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': 'https://heisenberg.ar',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);

    if (url.pathname !== '/api/contact') {
      return jsonResponse({ error: 'Not found' }, 404);
    }

    // Only POST is allowed
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    // Rate limiting by IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return jsonResponse({ error: 'Too many requests. Please try again later.' }, 429);
    }

    // Parse body
    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return jsonResponse({ error: 'All fields are required: name, email, message' }, 400);
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return jsonResponse({ error: 'Invalid email format' }, 400);
    }

    // Validate message length
    if (message.length < 10) {
      return jsonResponse({ error: 'Message must be at least 10 characters long' }, 400);
    }

    // TODO: Integrate email service (Resend, SendGrid, etc.)
    console.log('Contact form submission:', { name, email, message });

    return jsonResponse({ success: true, message: 'Message received. Thank you!' }, 200);
  },
};

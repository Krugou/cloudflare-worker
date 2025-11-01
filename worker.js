export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing ?url parameter", { status: 400 });
    }

    // Fetch the real Espoo API
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Proxy via Cloudflare Worker)",
      },
    });

    // Clone the response body
    const body = await response.text();

    // Send it back with permissive CORS
    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  },
};

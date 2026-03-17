export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const user = url.searchParams.get("user") || "default";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") return new Response(null,{headers});

    if (request.method === "GET") {
      const data = await env.JUJU_STORE.get(user);
      return new Response(data || "{}", { headers });
    }

    if (request.method === "POST") {
      const body = await request.text();
      await env.JUJU_STORE.put(user, body);
      return new Response(JSON.stringify({ok:true}), { headers });
    }

    return new Response("Not allowed", {status:405});
  }
};
export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();

    const token = process.env.TOKEN ?? import.meta.env.TOKEN;

    const res = await fetch("https://listmonk.m4rt.nl/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token api:${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

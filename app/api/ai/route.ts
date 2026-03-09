import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Cookie: cookieHeader,
    },
    body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/plain",
    },
  });
}

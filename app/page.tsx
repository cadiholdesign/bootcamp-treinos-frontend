import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getHomeData } from "@/app/_lib/fetch-generated";
import dayjs from "dayjs";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground">Home</p>
    </div>
  );
}

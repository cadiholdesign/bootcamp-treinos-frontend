"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error.message);
      return;
    }

    router.push("/auth");
  };

  return (
    <Button
      variant="destructive"
      onClick={handleSignOut}
      className="w-full gap-2 py-6 font-heading text-base"
    >
      <LogOut className="size-5" />
      Sair da conta
    </Button>
  );
}

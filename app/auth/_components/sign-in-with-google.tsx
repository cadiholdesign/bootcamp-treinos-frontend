"use client";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./google-icon";

export function SignInWithGoogle() {
  const handleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full gap-3 rounded-xl border-primary-foreground/20 bg-primary-foreground/10 py-6 text-base font-medium text-primary-foreground hover:bg-primary-foreground/20"
      onClick={handleSignIn}
    >
      <GoogleIcon />
      Entrar com o Google
    </Button>
  );
}

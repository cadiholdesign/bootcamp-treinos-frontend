"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SessionActionsProps {
  workoutPlanId: string;
  workoutDayId: string;
  activeSessionId: string | null;
  isCompleted: boolean;
  startSessionAction: () => Promise<void>;
  completeSessionAction: () => Promise<void>;
}

export function SessionActions({
  activeSessionId,
  isCompleted,
  startSessionAction,
  completeSessionAction,
}: SessionActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (isCompleted) {
    return (
      <Button variant="ghost" className="w-full py-6 font-heading text-base" disabled>
        <Check className="size-5" />
        Concluído!
      </Button>
    );
  }

  if (activeSessionId) {
    const handleComplete = async () => {
      setIsLoading(true);
      await completeSessionAction();
      router.refresh();
      setIsLoading(false);
    };

    return (
      <Button
        onClick={handleComplete}
        disabled={isLoading}
        className="w-full py-6 font-heading text-base"
      >
        <Check className="size-5" />
        {isLoading ? "Finalizando..." : "Marcar como concluído"}
      </Button>
    );
  }

  const handleStart = async () => {
    setIsLoading(true);
    await startSessionAction();
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isLoading}
      className="w-full py-6 font-heading text-base"
    >
      <Play className="size-5" />
      {isLoading ? "Iniciando..." : "Iniciar treino"}
    </Button>
  );
}

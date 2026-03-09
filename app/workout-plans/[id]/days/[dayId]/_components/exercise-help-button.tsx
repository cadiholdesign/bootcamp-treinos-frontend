"use client";

import { CircleHelp } from "lucide-react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";

interface ExerciseHelpButtonProps {
  exerciseName: string;
}

export function ExerciseHelpButton({ exerciseName }: ExerciseHelpButtonProps) {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0"
      onClick={() =>
        setChatParams({
          chat_open: true,
          chat_initial_message: `Como executar o exercício ${exerciseName} corretamente?`,
        })
      }
    >
      <CircleHelp className="size-5 text-muted-foreground" />
    </Button>
  );
}

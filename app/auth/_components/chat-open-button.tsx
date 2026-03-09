"use client";

import { Sparkles } from "lucide-react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";

export function ChatOpenButton() {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <Button
      onClick={() => setChatParams({ chat_open: true })}
      className="rounded-full p-4"
      size="icon"
    >
      <Sparkles className="size-6" />
    </Button>
  );
}
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExerciseCardProps {
  order: number;
  name: string;
  sets: number;
  reps: number;
  restTimeInSeconds: number;
}

export function ExerciseCard({
  order,
  name,
  sets,
  reps,
  restTimeInSeconds,
}: ExerciseCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-secondary p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <span className="font-heading text-sm font-semibold text-primary">
          {order}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="font-heading text-sm font-semibold text-foreground">
          {name}
        </span>
        <span className="font-heading text-xs text-muted-foreground">
          {sets} séries · {reps} reps · {restTimeInSeconds}s descanso
        </span>
      </div>
      <Button variant="ghost" size="icon" className="shrink-0">
        <CircleHelp className="size-5 text-muted-foreground" />
      </Button>
    </div>
  );
}

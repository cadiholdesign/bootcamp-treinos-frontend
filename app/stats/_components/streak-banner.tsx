import Image from "next/image";
import { Flame } from "lucide-react";

interface StreakBannerProps {
  workoutStreak: number;
}

export function StreakBanner({ workoutStreak }: StreakBannerProps) {
  const hasStreak = workoutStreak > 0;

  return (
    <div className="relative flex h-[140px] w-full items-center overflow-hidden rounded-xl">
      <Image
        src="/stats-banner.png"
        alt="Streak banner"
        fill
        className="object-cover"
      />
      <div
        className={`absolute inset-0 ${hasStreak ? "bg-primary/80" : "bg-muted-foreground/80"}`}
      />
      <div className="relative flex w-full items-center justify-between px-5">
        <div className="flex flex-col gap-1">
          <span className="font-heading text-sm text-background/70">
            {hasStreak ? "Sequência atual" : "Sem sequência"}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-4xl font-bold text-background">
              {workoutStreak}
            </span>
            <span className="font-heading text-base text-background/70">
              {workoutStreak === 1 ? "dia" : "dias"}
            </span>
          </div>
        </div>
        <Flame className="size-10 text-background" />
      </div>
    </div>
  );
}

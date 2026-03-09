import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getWorkoutPlansWorkoutPlanIdDaysWorkoutDayId } from "@/app/_lib/fetch-generated";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Timer, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppShell } from "@/app/_components/app-shell";
import { ExerciseCard } from "./_components/exercise-card";
import { SessionActions } from "./_components/session-actions";
import { startSession, completeSession } from "./actions";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

interface WorkoutDayPageProps {
  params: Promise<{ id: string; dayId: string }>;
}

export default async function WorkoutDayPage({ params }: WorkoutDayPageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { id: workoutPlanId, dayId } = await params;
  const workoutDay = await getWorkoutPlansWorkoutPlanIdDaysWorkoutDayId(
    workoutPlanId,
    dayId,
  );

  if (workoutDay.status !== 200) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">Treino não encontrado.</p>
      </div>
    );
  }

  const {
    name,
    weekDay,
    estimatedDurationInSeconds,
    exercises,
    sessions,
    coverImageUrl,
  } = workoutDay.data;

  const sortedExercises = [...exercises].sort((a, b) => a.order - b.order);
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  const activeSession = sessions.find((s) => s.startedAt && !s.completedAt);
  const completedSession = sessions.find((s) => s.completedAt);
  const isCompleted = !!completedSession;

  const startSessionWithIds = startSession.bind(null, workoutPlanId, dayId);
  const completeSessionWithIds = activeSession
    ? completeSession.bind(null, workoutPlanId, dayId, activeSession.id)
    : async () => {};

  return (
    <div className="flex min-h-svh flex-col bg-background pb-32">
      <div className="relative h-[220px] w-full overflow-hidden">
        {coverImageUrl && (
          <Image
            src={coverImageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-background" asChild>
              <Link href={`/workout-plans/${workoutPlanId}`}>
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <Badge
              variant="secondary"
              className="w-fit gap-1 bg-background/16 text-background backdrop-blur-sm"
            >
              <Calendar className="size-3.5" />
              {WEEKDAY_LABELS[weekDay]}
            </Badge>
            <h1 className="font-heading text-2xl font-semibold text-background">
              {name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Timer className="size-3.5 text-background/70" />
                <span className="font-heading text-xs text-background/70">
                  {durationInMinutes}min
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Dumbbell className="size-3.5 text-background/70" />
                <span className="font-heading text-xs text-background/70">
                  {exercises.length} exercícios
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Exercícios
        </h2>
        {sortedExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            order={exercise.order}
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
            restTimeInSeconds={exercise.restTimeInSeconds}
          />
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 z-40 px-5">
        <SessionActions
          workoutPlanId={workoutPlanId}
          workoutDayId={dayId}
          activeSessionId={activeSession?.id ?? null}
          isCompleted={isCompleted}
          startSessionAction={startSessionWithIds}
          completeSessionAction={completeSessionWithIds}
        />
      </div>

      <AppShell activePage="calendar" calendarHref={`/workout-plans/${workoutPlanId}`} />
    </div>
  );
}

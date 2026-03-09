import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getWorkoutPlansWorkoutPlanId } from "@/app/_lib/fetch-generated";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { AppShell } from "@/app/_components/app-shell";

const WEEKDAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

interface WorkoutPlanPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPlanPage({ params }: WorkoutPlanPageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { id } = await params;
  const workoutPlan = await getWorkoutPlansWorkoutPlanId(id);

  if (workoutPlan.status !== 200) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">
          Plano de treino não encontrado.
        </p>
      </div>
    );
  }

  const { name, workoutDays } = workoutPlan.data;

  const sortedDays = [...workoutDays].sort(
    (a, b) => WEEKDAY_ORDER.indexOf(a.weekDay) - WEEKDAY_ORDER.indexOf(b.weekDay)
  );

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="flex items-center gap-3 p-5">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-lg font-semibold text-foreground">
            Plano de treino
          </h1>
          <Badge variant="secondary" className="font-heading text-xs">
            {name}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5">
        {sortedDays.map((day) => (
          <Link
            key={day.id}
            href={`/workout-plans/${id}/days/${day.id}`}
          >
            {day.isRest ? (
              <div className="flex h-[200px] items-center justify-center rounded-xl bg-secondary">
                <p className="font-heading text-base text-muted-foreground">
                  Dia de descanso 😴
                </p>
              </div>
            ) : (
              <WorkoutDayCard
                name={day.name}
                weekDay={day.weekDay}
                estimatedDurationInSeconds={day.estimatedDurationInSeconds}
                exercisesCount={day.exercisesCount}
                coverImageUrl={day.coverImageUrl}
              />
            )}
          </Link>
        ))}
      </div>

      <AppShell activePage="calendar" calendarHref={`/workout-plans/${id}`} />
    </div>
  );
}

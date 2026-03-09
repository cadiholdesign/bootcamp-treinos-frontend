import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getHomeData } from "@/app/_lib/fetch-generated";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { ConsistencyTracker } from "@/app/_components/consistency-tracker";
import { AppShell } from "@/app/_components/app-shell";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs();
  const homeData = await getHomeData(today.format("YYYY-MM-DD"));

  if (homeData.status !== 200) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">
          Erro ao carregar dados. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const { todayWorkoutDay, workoutStreak, consistencyByDay } = homeData.data;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="relative h-[260px] w-full overflow-hidden">
        <Image
          src="/home-banner.jpg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <Image
              src="/fit-ai-logo.svg"
              alt="FIT.AI"
              width={70}
              height={30}
            />
            <div className="flex items-center gap-1.5 rounded-full bg-background/16 px-3 py-1.5 backdrop-blur-sm">
              <Flame className="size-4 text-background" />
              <span className="font-heading text-sm font-semibold text-background">
                {workoutStreak}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-heading text-sm text-background/70">
              Olá, {session.data.user.name?.split(" ")[0]}
            </span>
            <h1 className="font-heading text-2xl font-semibold text-background">
              Bora treinar hoje?
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Treino de hoje
            </h2>
            <Button variant="link" className="h-auto p-0 font-heading text-sm text-primary">
              Ver histórico
            </Button>
          </div>

          {todayWorkoutDay.isRest ? (
            <div className="flex h-[200px] items-center justify-center rounded-xl bg-secondary">
              <p className="font-heading text-base text-muted-foreground">
                Hoje é dia de descanso 😴
              </p>
            </div>
          ) : (
            <Link
              href={`/workout-plans/${homeData.data.activeWorkoutPlanId}/days/${todayWorkoutDay.id}`}
            >
              <WorkoutDayCard
                name={todayWorkoutDay.name}
                weekDay={todayWorkoutDay.weekDay}
                estimatedDurationInSeconds={todayWorkoutDay.estimatedDurationInSeconds}
                exercisesCount={todayWorkoutDay.exercisesCount}
                coverImageUrl={todayWorkoutDay.coverImageUrl}
              />
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Consistência
            </h2>
            <Button variant="link" className="h-auto p-0 font-heading text-sm text-primary">
              Ver treinos
            </Button>
          </div>

          <ConsistencyTracker
            consistencyByDay={consistencyByDay}
            today={today}
          />
        </div>
      </div>

      <AppShell
        activePage="home"
        calendarHref={`/workout-plans/${homeData.data.activeWorkoutPlanId}`}
      />
    </div>
  );
}

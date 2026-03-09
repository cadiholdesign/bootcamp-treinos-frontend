import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getStats } from "@/app/_lib/fetch-generated";
import { checkOnboarding } from "@/app/_lib/check-onboarding";
import dayjs from "dayjs";
import { Dumbbell, Timer, Target } from "lucide-react";
import { AppShell } from "@/app/_components/app-shell";
import { StreakBanner } from "./_components/streak-banner";
import { StatCard } from "./_components/stat-card";
import { ConsistencyHeatmap } from "./_components/consistency-heatmap";

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? `${minutes}min` : ""}`;
  }
  return `${minutes}min`;
}

export default async function StatsPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  await checkOnboarding();

  const today = dayjs();
  const from = today.subtract(2, "month").startOf("month");
  const to = today;

  const stats = await getStats({
    from: from.format("YYYY-MM-DD"),
    to: to.format("YYYY-MM-DD"),
  });

  if (stats.status !== 200) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">
          Erro ao carregar estatísticas.
        </p>
      </div>
    );
  }

  const {
    workoutStreak,
    consistencyByDay,
    completedWorkoutsCount,
    conclusionRate,
    totalTimeInSeconds,
  } = stats.data;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="p-5">
        <h1 className="font-heading text-lg font-semibold text-foreground">
          Estatísticas
        </h1>
      </div>

      <div className="flex flex-col gap-6 px-5">
        <StreakBanner workoutStreak={workoutStreak} />

        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Consistência
          </h2>
          <ConsistencyHeatmap
            consistencyByDay={consistencyByDay}
            from={from}
            to={to}
          />
        </div>

        <div className="flex gap-3">
          <StatCard
            icon={Dumbbell}
            label="Treinos concluídos"
            value={String(completedWorkoutsCount)}
          />
          <StatCard
            icon={Target}
            label="Taxa de conclusão"
            value={`${Math.round(conclusionRate * 100)}%`}
          />
          <StatCard
            icon={Timer}
            label="Tempo total"
            value={formatDuration(totalTimeInSeconds)}
          />
        </div>
      </div>

      <AppShell activePage="stats" />
    </div>
  );
}

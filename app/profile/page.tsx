import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getUserTrainData } from "@/app/_lib/fetch-generated";
import { checkOnboarding } from "@/app/_lib/check-onboarding";
import Image from "next/image";
import { Weight, Ruler, CalendarDays, Percent } from "lucide-react";
import { AppShell } from "@/app/_components/app-shell";
import { ProfileInfoCard } from "./_components/profile-info-card";
import { SignOutButton } from "./_components/sign-out-button";

export default async function ProfilePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  await checkOnboarding();

  const trainData = await getUserTrainData();

  const user = session.data.user;

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="p-5">
        <h1 className="font-heading text-lg font-semibold text-foreground">
          Perfil
        </h1>
      </div>

      <div className="flex flex-col gap-6 px-5">
        <div className="flex flex-col items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? ""}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-primary">
              <span className="font-heading text-2xl font-semibold text-primary-foreground">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <span className="font-heading text-lg font-semibold text-foreground">
              {user.name}
            </span>
            <span className="font-heading text-sm text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>

        {trainData.status === 200 && trainData.data && (
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Dados físicos
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <ProfileInfoCard
                icon={Weight}
                label="Peso"
                value={`${(trainData.data.weightInGrams / 1000).toFixed(1)} kg`}
              />
              <ProfileInfoCard
                icon={Ruler}
                label="Altura"
                value={`${trainData.data.heightInCentimeters} cm`}
              />
              <ProfileInfoCard
                icon={CalendarDays}
                label="Idade"
                value={`${trainData.data.age} anos`}
              />
              <ProfileInfoCard
                icon={Percent}
                label="Gordura corporal"
                value={`${trainData.data.bodyFatPercentage}%`}
              />
            </div>
          </div>
        )}

        <SignOutButton />
      </div>

      <AppShell activePage="profile" />
    </div>
  );
}

"use server";

import { revalidatePath } from "next/cache";
import {
  postWorkoutPlansWorkoutPlanIdDaysWorkoutDayIdSessions,
  patchWorkoutPlansWorkoutPlanIdDaysWorkoutDayIdSessionsSessionId,
} from "@/app/_lib/fetch-generated";

export async function startSession(workoutPlanId: string, workoutDayId: string) {
  await postWorkoutPlansWorkoutPlanIdDaysWorkoutDayIdSessions(
    workoutPlanId,
    workoutDayId,
  );
  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}

export async function completeSession(
  workoutPlanId: string,
  workoutDayId: string,
  sessionId: string,
) {
  await patchWorkoutPlansWorkoutPlanIdDaysWorkoutDayIdSessionsSessionId(
    workoutPlanId,
    workoutDayId,
    sessionId,
  );
  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}

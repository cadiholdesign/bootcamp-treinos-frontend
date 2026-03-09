import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { getHomeData, getUserTrainData } from "@/app/_lib/fetch-generated";

export async function checkOnboarding() {
  const today = dayjs();
  const [homeData, trainData] = await Promise.all([
    getHomeData(today.format("YYYY-MM-DD")),
    getUserTrainData(),
  ]);

  const hasActivePlan = homeData.status === 200;
  const hasTrainData = trainData.status === 200 && trainData.data !== null;

  if (!hasActivePlan || !hasTrainData) {
    redirect("/onboarding");
  }

  return homeData;
}

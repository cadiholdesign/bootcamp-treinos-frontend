import dayjs from "dayjs";
import type { GetStats200ConsistencyByDay } from "@/app/_lib/fetch-generated";

const WEEKDAY_SHORT = ["S", "T", "Q", "Q", "S", "S", "D"];

const MONTH_LABELS: Record<number, string> = {
  0: "Jan",
  1: "Fev",
  2: "Mar",
  3: "Abr",
  4: "Mai",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Set",
  9: "Out",
  10: "Nov",
  11: "Dez",
};

interface ConsistencyHeatmapProps {
  consistencyByDay: GetStats200ConsistencyByDay;
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
}

function getMonday(date: dayjs.Dayjs) {
  const day = date.day();
  return day === 0 ? date.subtract(6, "day") : date.subtract(day - 1, "day");
}

interface WeekData {
  dates: dayjs.Dayjs[];
  month: number;
}

function getWeeks(from: dayjs.Dayjs, to: dayjs.Dayjs): WeekData[] {
  const weeks: WeekData[] = [];
  let current = getMonday(from);

  while (current.isBefore(to) || current.isSame(to, "day")) {
    const weekDates: dayjs.Dayjs[] = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(current.add(i, "day"));
    }
    weeks.push({
      dates: weekDates,
      month: weekDates[0].month(),
    });
    current = current.add(7, "day");
  }

  return weeks;
}

function groupWeeksByMonth(weeks: WeekData[]) {
  const groups: { month: number; weeks: WeekData[] }[] = [];

  for (const week of weeks) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.month === week.month) {
      lastGroup.weeks.push(week);
    } else {
      groups.push({ month: week.month, weeks: [week] });
    }
  }

  return groups;
}

export function ConsistencyHeatmap({
  consistencyByDay,
  from,
  to,
}: ConsistencyHeatmapProps) {
  const weeks = getWeeks(from, to);
  const monthGroups = groupWeeksByMonth(weeks);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-[3px]">
        <div className="flex gap-1.5">
          <div className="w-5 shrink-0" />
          <div className="grid flex-1 auto-cols-fr grid-flow-col gap-[3px]">
            {weeks.map((week, weekIdx) => {
              const isFirstOfMonth =
                weekIdx === 0 || weeks[weekIdx - 1].month !== week.month;
              return (
                <div
                  key={weekIdx}
                  className="font-heading text-[10px] text-muted-foreground"
                >
                  {isFirstOfMonth ? MONTH_LABELS[week.month] : ""}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-1.5">
          <div className="flex w-5 shrink-0 flex-col gap-[3px]">
            {WEEKDAY_SHORT.map((label, i) => (
              <div
                key={i}
                className="flex flex-1 items-center font-heading text-[10px] text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="grid flex-1 auto-cols-fr grid-flow-col gap-[3px]">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {week.dates.map((date) => {
                const dateStr = date.format("YYYY-MM-DD");
                const dayData = consistencyByDay[dateStr];
                const isInRange =
                  (date.isAfter(from) || date.isSame(from, "day")) &&
                  (date.isBefore(to) || date.isSame(to, "day"));

                if (!isInRange) {
                  return (
                    <div key={dateStr} className="aspect-square w-full" />
                  );
                }

                if (dayData?.workoutDayCompleted) {
                  return (
                    <div
                      key={dateStr}
                      className="aspect-square w-full rounded-[3px] bg-primary"
                    />
                  );
                }

                if (dayData?.workoutDayStarted) {
                  return (
                    <div
                      key={dateStr}
                      className="aspect-square w-full rounded-[3px] bg-primary/20"
                    />
                  );
                }

                return (
                  <div
                    key={dateStr}
                    className="aspect-square w-full rounded-[3px] border border-border"
                  />
                );
              })}
            </div>
          ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="font-heading text-[10px] text-muted-foreground">
          Menos
        </span>
        <div className="size-[14px] rounded-[3px] border border-border" />
        <div className="size-[14px] rounded-[3px] bg-primary/20" />
        <div className="size-[14px] rounded-[3px] bg-primary" />
        <span className="font-heading text-[10px] text-muted-foreground">
          Mais
        </span>
      </div>
    </div>
  );
}

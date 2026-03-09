"use client";

import { BottomNav } from "./bottom-nav";
import { Chat } from "./chat";

interface AppShellProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
  calendarHref?: string | null;
}

export function AppShell({ activePage = "home", calendarHref }: AppShellProps) {
  return (
    <>
      <Chat />
      <BottomNav activePage={activePage} calendarHref={calendarHref} />
    </>
  );
}

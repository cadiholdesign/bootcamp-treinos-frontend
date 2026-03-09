"use client";

import Link from "next/link";
import {
  House,
  Calendar,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatOpenButton } from "./chat-open-button";

interface BottomNavProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
  calendarHref?: string | null;
}

export function BottomNav({ activePage = "home", calendarHref }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 rounded-t-[20px] border border-border bg-background px-6 py-4">
      <Link href="/" className="p-3">
        <House
          className={cn(
            "size-6",
            activePage === "home" ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </Link>
      {calendarHref ? (
        <Link href={calendarHref} className="p-3">
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          />
        </Link>
      ) : (
        <Button variant="ghost" className="p-3">
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          />
        </Button>
      )}
      <ChatOpenButton />
      <Link href="/stats" className="p-3">
        <ChartNoAxesColumn
          className={cn(
            "size-6",
            activePage === "stats"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        />
      </Link>
      <Link href="/profile" className="p-3">
        <UserRound
          className={cn(
            "size-6",
            activePage === "profile"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        />
      </Link>
    </nav>
  );
}

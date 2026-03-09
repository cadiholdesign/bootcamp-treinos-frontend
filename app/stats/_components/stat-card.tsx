import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl bg-secondary p-4">
      <Icon className="size-5 text-primary" />
      <span className="font-heading text-xs text-muted-foreground">
        {label}
      </span>
      <span className="font-heading text-xl font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

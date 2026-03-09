import type { LucideIcon } from "lucide-react";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ProfileInfoCard({ icon: Icon, label, value }: ProfileInfoCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-secondary p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-heading text-xs text-muted-foreground">
          {label}
        </span>
        <span className="font-heading text-sm font-semibold text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

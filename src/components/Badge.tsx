import "./Badge.css";

interface BadgeProps {
  title: string;
  color?: "primary" | "secondary" | "accent";
}

export default function Badge({ title, color }: BadgeProps) {
  const badgeClass = `badge badge-${color}`;
  return <div className={badgeClass}>✦ {title}</div>;
}

import "./Badge.css";

interface BadgeProps {
  title: string;
}

export default function Badge({ title }: BadgeProps) {
  const badgeClass = `badge badge-accent`;
  return <div className={badgeClass}>✦ {title}</div>;
}

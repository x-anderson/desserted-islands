import logoFull from "../img/desserted_islands_logo.png";

export default function LogoBadge({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={logoFull}
      alt="Desserted Islands"
      className={className}
      style={{ mixBlendMode: "multiply", ...style }}
    />
  );
}

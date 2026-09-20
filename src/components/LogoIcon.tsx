import logoIcon from "../img/desserted_islands_logo.png";

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <img
      src={logoIcon}
      alt="Desserted Islands icon"
      className={className}
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import "./Button.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  icon?: IconDefinition;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  href,
  onClick,
  className,
  icon,
}: ButtonProps) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== "md" ? `btn-${size}` : "";
  const widthClass = fullWidth ? "btn-full" : "";
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${
    className || ""
  }`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon && <FontAwesomeIcon className="icon" icon={icon} size="lg" />}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {icon && <FontAwesomeIcon className="icon" icon={icon} size="lg" />}
      {children}
    </button>
  );
}

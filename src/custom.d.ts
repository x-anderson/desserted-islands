import { AriaAttributes, DOMAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

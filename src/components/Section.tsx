import "./Section.css";
import "./Carousel.css";
import cx from "classnames";

type SectionProps = {
  about: string;
  background: "light" | "dark" | "gradient";
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export default function Section(props: SectionProps) {
  const { about, background, className } = props;

  return (
    <section
      about={about}
      className={cx("section", `background-${background}`, className)}
    >
      {props.children}
    </section>
  );
}

import "./Section.css";
import cx from "classnames";

type SectionProps = {
  about: string;
  placement: "odd" | "even";
  className?: string;
  children: JSX.Element | JSX.Element[];
};

export default function Section(props: SectionProps) {
  const { about, placement, className } = props;

  return (
    <section
      about={about}
      className={cx(
        "section",
        className,
        placement === "odd" ? "background-one" : "background-two"
      )}
    >
      {props.children}
    </section>
  );
}

import "./Skeleton.css";

type SkeletonProps = {
  width?: string;
};

export default function Skeleton({ width = "5rem" }: SkeletonProps) {
  return <span className="skeleton" style={{ width }} aria-hidden="true" />;
}

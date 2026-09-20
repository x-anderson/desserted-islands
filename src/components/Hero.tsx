import "./Hero.css";
import LogoBadge from "./LogoBadge";
import Button from "./Button";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { HEADER_HEIGHT_MOBILE } from "./Header";

// TODO - Fetch data?
const DONE_COUNT = 99;
const TOTAL_COUNT = 103;

function ShapeBlob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="55" />
    </svg>
  );
}

function ShapeDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points="50,5 95,50 50,95 5,50" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      style={{ marginTop: `${HEADER_HEIGHT_MOBILE}px` }}
      className="hero-section"
      id="hero"
    >
      <ShapeBlob className="shape-blob shape-blob-top-left" />
      <ShapeBlob className="shape-blob shape-blob-bottom-right" />
      <ShapeDiamond className="shape-diamond shape-diamond-top-right" />
      <ShapeDiamond className="shape-diamond shape-diamond-bottom-left" />

      <div className="hero-logo-container">
        <div className="hero-logo-shadow" />
        <LogoBadge className="hero-logo" />
      </div>

      <div className="hero-main">
        <h1>
          Discover the Best Desserts{" "}
          <span className="hero-title-highlight">from Around the Globe</span>
        </h1>

        <p>
          There are <strong>{TOTAL_COUNT} island countries</strong> in the
          world. <em>What do you think they eat for dessert?</em>
        </p>

        <div className="hero-progress-bar-container">
          <span className="hero-progress-emoji">🍰</span>
          <span className="hero-progress-text">
            <span className="hero-progress-number">{DONE_COUNT}</span>
            <span className="hero-progress-label">
              {" "}
              of {TOTAL_COUNT} islands baked
            </span>
          </span>
          <span className="hero-progress-emoji">🌊</span>
          <div className="hero-progress-bar">
            <div
              className="hero-progress-bar-fill"
              style={{
                width: `${(DONE_COUNT / TOTAL_COUNT) * 100}%`,
              }}
            />
          </div>
          <div className="hero-progress-bar-labels">
            <span className="hero-progress-bar-label">Started</span>
            <span className="hero-progress-bar-label">
              {Math.round((DONE_COUNT / TOTAL_COUNT) * 100)}% complete
            </span>
          </div>
        </div>

        <div className="hero-buttons">
          <Button variant="primary" href="#the-map" icon={faMap}>
            Explore the map
          </Button>
          <Button variant="secondary" href="#gallery" icon={faBirthdayCake}>
            See the bakes
          </Button>
        </div>
      </div>
    </section>
  );
}

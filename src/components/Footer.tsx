import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";
import "./Footer.css";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import LogoCroppedSingleColor from "./LogoCroppedSingleColor";

const IG_URL = "https://www.instagram.com/desserted_islands/";

function ShapeBlob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="55" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <ShapeBlob className="footer-shape-blob footer-shape-blob-top" />
      <ShapeBlob className="footer-shape-blob footer-shape-blob-bottom" />

      <div className="footer-content">
        <div className="footer-logo-container">
          <LogoCroppedSingleColor className="footer-logo" />
        </div>

        <p className="footer-description">
          One baker on a deliciously obsessive mission to bake something sweet
          <br />
          from every island country in the world.
        </p>

        <div className="footer-links">
          <Button
            variant="muted"
            href={IG_URL}
            onClick={(e) => {
              if (typeof window !== "undefined") {
                window.open(IG_URL, "_blank", "noopener,noreferrer");
                e.preventDefault();
              }
            }}
            icon={faInstagram}
            size="sm"
          >
            @desserted_islands
          </Button>
          <Button
            variant="muted"
            href="mailto:dessertedislands22@gmail.com"
            icon={faEnvelope}
            size="sm"
          >
            dessertedislands22@gmail.com
          </Button>
        </div>

        <div className="footer-divider">Made with 🧁 & a lot of washing up</div>
      </div>
    </footer>
  );
}

import "./Header.css";
import LogoCroppedWithTitle from "./LogoCroppedWithTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
  return (
    <header className="app-header">
      <LogoCroppedWithTitle className="app-header-logo" />
      <div className="app-header-icons">
        <a
          href="https://www.instagram.com/desserted_islands/"
          aria-label="Visit the Desserted Islands Instagram account"
        >
          <FontAwesomeIcon size="2xl" className="icon" icon={faInstagram} />
        </a>
        <a
          href="mailto:dessertedislands22@gmail.com"
          aria-label="Send us an email"
        >
          <FontAwesomeIcon size="2xl" className="icon" icon={faEnvelope} />
        </a>
      </div>
    </header>
  );
}

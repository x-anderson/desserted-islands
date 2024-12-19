import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import LogoCroppedWithTitle from "./LogoCroppedWithTitle";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-logo-and-links">
        <LogoCroppedWithTitle className="footer-logo" />
        <div className="footer-links">
          <p>👋 I post all my delicious desserts here:</p>
          <a
            href="https://www.instagram.com/desserted_islands/"
            aria-label="Visit the Desserted Islands Instagram account"
          >
            <FontAwesomeIcon className="icon" icon={faInstagram} size="2xl" />
          </a>
        </div>
      </div>
      <hr />
      <p>© All rights reserved.</p>
    </footer>
  );
}

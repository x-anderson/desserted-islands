import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="social-links">
        <a href="https://www.instagram.com/desserted_islands/">
          <FontAwesomeIcon className="social-icon" icon={faInstagram} />
        </a>
      </div>
      <p>© Copyright 2022 Xander Anderson</p>
    </footer>
  );
}

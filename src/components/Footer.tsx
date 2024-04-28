import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="social-links">
        <p>👋 I post all my delicious desserts on Instagram here:</p>
        <a href="https://www.instagram.com/desserted_islands/">
          <FontAwesomeIcon
            className="social-icon"
            icon={faInstagram}
            title="Instagram link"
          />
        </a>
      </div>
    </footer>
  );
}

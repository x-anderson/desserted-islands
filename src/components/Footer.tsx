import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="links">
        <p>👋 I post all my delicious desserts here:</p>
        <a href="https://www.instagram.com/desserted_islands/">
          <FontAwesomeIcon className="icon" icon={faInstagram} title="Link" />
        </a>
      </div>
    </footer>
  );
}

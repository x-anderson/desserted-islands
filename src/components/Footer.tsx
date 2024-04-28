import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const icon = faInstagram;

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="links">
        <p>👋 I post all my delicious desserts here:</p>
        <a href="https://www.instagram.com/desserted_islands/">
          <FontAwesomeIcon className="icon" icon={icon} title="Link" />
        </a>
      </div>
    </footer>
  );
}

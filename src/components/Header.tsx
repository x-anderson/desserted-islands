import "./Header.css";
import { useState } from "react";
import Button from "./Button";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import LogoCropped from "./LogoCropped";

export const HEADER_HEIGHT_MOBILE = 62;
const IG_URL = "https://www.instagram.com/desserted_islands/";

export default function Header() {
  return (
    <>
      <Nav />
      <MobileNav />
    </>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo">
        <LogoCropped className="mobile-nav-logo-icon" />
        <span className="nav-logo-text">Desserted Islands</span>
      </a>
      <div className="nav-menu">
        {["About", "The Map", "Gallery"].map((item) => (
          <a
            className="nav-link"
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
          >
            {item}
          </a>
        ))}
        <Button
          variant="primary"
          size="sm"
          href={IG_URL}
          onClick={(e) => {
            if (typeof window !== "undefined") {
              window.open(IG_URL, "_blank", "noopener,noreferrer");
              e.preventDefault();
            }
          }}
          icon={faInstagram}
        >
          @desserted_islands
        </Button>
      </div>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ height: `${HEADER_HEIGHT_MOBILE}px` }} className="mobile-nav">
      <div className="mobile-nav-header">
        <a href="#hero">
          <LogoCropped className="mobile-nav-logo-icon" />
        </a>
        <span className="nav-logo-text">Desserted Islands</span>
        <button
          onClick={() => setOpen(!open)}
          className="mobile-nav-toggle"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="mobile-nav-menu">
          {["About", "The Map", "Gallery"].map((item) => (
            <a
              className="nav-link"
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button
            variant="primary"
            size="sm"
            href={IG_URL}
            onClick={(e) => {
              if (typeof window !== "undefined") {
                window.open(IG_URL, "_blank", "noopener,noreferrer");
                e.preventDefault();
              }
            }}
            icon={faInstagram}
          >
            @desserted_islands
          </Button>
        </div>
      )}
    </nav>
  );
}

import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <img
        className="app-icon"
        src="/desserted-islands-logo.png"
        alt="company logo"
      />
    </header>
  );
}

export function HeaderAlt() {
  return (
    <header className="app-header-alt">
      <img
        className="app-icon"
        src="/desserted-islands-logo-notext.png"
        alt="company logo"
      />
      <img className="app-title" src="/title.png" alt="company title" />
    </header>
  );
}

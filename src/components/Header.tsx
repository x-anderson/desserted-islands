import "./Header.css";
import LogoCropped from "./LogoCropped";

export default function Header() {
  return (
    <header className="app-header">
      <h1 className="header-logo-text">Desserted</h1>
      <LogoCropped />
      <h1 className="header-logo-text">Islands</h1>
    </header>
  );
}

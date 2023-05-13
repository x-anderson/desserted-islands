import "./Login.css";
import netlifyIdentity from "netlify-identity-widget";

export default function Login() {
  return (
    <div className="login-page">
      <button className="login-button" onClick={() => netlifyIdentity.open()}>
        Login
      </button>
    </div>
  );
}

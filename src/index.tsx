import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
const netlifyIdentity = require("netlify-identity-widget");

netlifyIdentity.init();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossOrigin=""
    />
    <App />
  </React.StrictMode>
);

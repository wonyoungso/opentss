import * as React from "react";
import * as ReactDOMClient from 'react-dom/client';
import App from "../components/App";
import "trix"
import "@rails/actiontext"
import "./main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  const root = ReactDOMClient.createRoot(rootEl);

  root.render(<App />);
});
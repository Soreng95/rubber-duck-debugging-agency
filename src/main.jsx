// ============================================================
//  src/main.jsx — where React starts
// ============================================================
//
//  This file runs exactly once, when the page loads. Its whole job is:
//
//      "Find the empty div in index.html, and render <App /> inside it."
//
//  That is the bridge between plain HTML and React. After this line runs,
//  React owns that div and everything inside it.
//
//  You will rarely touch this file. The interesting code is in App.jsx.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importing a CSS file from JavaScript looks weird, but this is how it works
// in Vite. index.css is loaded for the whole app because it is imported here.
import "./index.css";

import App from "./App.jsx";

// 1. document.getElementById("root") — plain JavaScript you already know.
//    It grabs <div id="root"> from index.html.
// 2. createRoot(...) — hands that div over to React.
// 3. .render(<App />) — draws our App component into it.
createRoot(document.getElementById("root")).render(
  // StrictMode is a development-only helper. It deliberately runs some of
  // your code twice to help you spot bugs. If you ever see a console.log
  // appear twice while developing, this is why — it is not a bug.
  <StrictMode>
    <App />
  </StrictMode>,
);

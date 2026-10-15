// ============================================================
//  src/App.jsx — the top component of the whole app
// ============================================================
//
//  main.jsx renders <App />, and App renders everything else. So this file
//  is the root of your component tree:
//
//      App
//      ├── Hero      (#5, #6, #7)
//      ├── Lineup    (#8, #9, #10)
//      │   └── ArtistCard × 8
//      └── Tickets   (#13, #14, #15)
//
//  App has two jobs and no markup of its own:
//
//    1. Fetch the content once and hand each section its own slice.
//    2. Decide whether to show the poster or the tutorial.
//
//  The React tutorial this project started as now lives in
//  components/Help.jsx. Open it at /#help.

import { useEffect, useState } from "react";

import Hero from "./components/Hero.jsx";
import Lineup from "./components/Lineup.jsx";
import Tickets from "./components/Tickets.jsx";
import Faq from "./components/Faq.jsx";
import Help from "./components/Help.jsx";

import { fetchContent } from "./api.js";

// We have no router, and one page does not need one. The address bar already
// carries a value we can read: everything after the "#". /#help shows the
// tutorial, anything else shows the poster.
//
// The `typeof window` guard is there because this is read while the module
// loads, and `window` does not exist outside a browser.
function isHelpUrl() {
  return typeof window !== "undefined" && window.location.hash === "#help";
}

export default function App() {
  // ------------------------------------------------------------
  //  Loading data from a server
  // ------------------------------------------------------------
  //  The poster text does not live in this project — it comes from our
  //  backend, and the browser has to go and ask for it.
  //
  //  The request happens HERE, once, in the component above everyone who
  //  needs the data. Each section then gets its own slice as a prop. If
  //  every component fetched for itself, one page load would fire five
  //  requests for data that arrives in a single one.
  //
  //  `null` means "we have not heard back yet". It is not an error.
  const [content, setContent] = useState(null);

  //  useEffect is for talking to the world outside React: networks, timers,
  //  the browser itself. The empty array at the end means "run once, after
  //  the first render". Without it the fetch would run on every render, and
  //  setting state causes a render, which would fetch again, for ever.
  useEffect(() => {
    //  An AbortController is a remote control for the request. If this
    //  component disappears while the answer is still on its way, the cleanup
    //  below cancels it - otherwise we set state on something that is gone.
    const controller = new AbortController();

    async function load() {
      try {
        setContent(await fetchContent(controller.signal));
      } catch (error) {
        //  Cancelling on purpose throws too, and that is not worth shouting
        //  about. Anything else is a real failure.
        if (error.name !== "AbortError") {
          console.error(error);
        }
        //  Note what we do NOT do: blank the page. `content` stays null and
        //  each section falls back to its own built-in copy, so a backend
        //  having a bad morning costs us the live text, not the layout.
      }
    }

    load();

    //  Returning a function from useEffect is how you clean up after
    //  yourself. React runs it when the component goes away.
    //
    //  In development this fetch happens twice. That is StrictMode in
    //  main.jsx deliberately mounting everything twice to prove the cleanup
    //  works. The built app runs it once.
    return () => controller.abort();
  }, []);

  // ------------------------------------------------------------
  //  Which page are we on?
  // ------------------------------------------------------------
  //  Changing the "#..." part of the address does not reload the page, so
  //  the browser tells us about it with a "hashchange" event instead. We
  //  listen for it, and clean up the listener when App goes away - the same
  //  rule as the fetch above.
  const [showHelp, setShowHelp] = useState(isHelpUrl);

  useEffect(() => {
    function handleHashChange() {
      setShowHelp(isHelpUrl());
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (showHelp) {
    return <Help />;
  }

  return (
    // A component must return ONE element. We do not want an extra <div>
    // wrapped around the whole poster, so this is an empty "fragment":
    // <> ... </>. It groups the sections without appearing in the HTML.
    <>
      {/* Each section is handed its own slice of the content. `content` is
          null until the fetch lands, so on the first render every section
          gets `undefined` and falls back to its own built-in copy. Optional
          chaining (`?.`) is what stops that null from throwing. */}

      {/* Pass the hero content from the API to the Hero component. */}
      <Hero content={content?.hero} meta={content?.meta} />


      <Lineup content={content?.lineup} />
      <Tickets content={content?.tickets} />
      <Faq content={content?.faq} meta={content?.meta} />
    </>
  );
}

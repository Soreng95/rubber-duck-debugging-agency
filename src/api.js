// ============================================================
//  src/api.js — the one place that knows where the content lives
// ============================================================
//
//  Every section of the poster (hero, line-up, tickets) reads from the same
//  API, so the address belongs in one file. Change it here and the whole app
//  follows. The alternative — a URL pasted into each component — means a
//  three-file hunt the day we move the backend.
//
//  The shape is the one agreed in issue #26: GET /content returns every
//  section in a single request. That is why App fetches once and passes the
//  sections down as props, instead of each component fetching its own.
//
//  GET /content/hero still works and is handy while building one section
//  alone, but it is not what the app ships with.

// import.meta.env is Vite's way of reading environment variables. Nobody has
// set VITE_API_URL, so for now this always falls back to the deployed API —
// but the hook is here for the day we run the backend locally.
const BASE = import.meta.env.VITE_API_URL ?? "https://stoy26.vercel.app";

// `signal` comes from an AbortController. Passing it to fetch lets the caller
// cancel a request that is still in flight — see the useEffect in App.jsx.
export async function fetchContent(signal) {
  const response = await fetch(`${BASE}/content`, { signal });

  // fetch only rejects when the network itself fails. A 404 or a 500 is a
  // perfectly successful request that happens to carry bad news, so we have
  // to check response.ok ourselves.
  if (!response.ok) {
    throw new Error(`Content API returned ${response.status}`);
  }

  return response.json();
}

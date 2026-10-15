import { useState } from "react";
import "./Sponsors.css";

// Default sponsors shown while the API loads or if the request fails.
// API provides a different sponsor list.
const FALLBACK = [
  { name: "NORDLYS",font: "archivo" },
  { name: "brenn",font: "grotesk" },
  { name: "FJORÅ", font: "oswald" },
  { name: "POLARIS", font: "mono" },
  { name: "Havna", font: "grotesk" },
  { name: "STRØM FM", font: "oswald" },
  { name: "KOLDT", font: "archivo" },
  { name: "midnatt_06", font: "mono" },
];
// Maps the font names from the API to our CSS tokens and typography styles.
const FONT_TOKENS = {
  archivo: { fontFamily: "var(--font-display)", letterSpacing: "-0.01em", },
  grotesk: { fontFamily: "var(--font-body)", fontWeight: 700, fontStyle: "italic", },
  oswald: { fontFamily: "var(--font-condensed)", fontWeight: 600, },
  mono: { fontFamily: "var(--font-mono)", letterSpacing: "0.12em", }
};

// App fetches the content and passes it down as props.
// Use fallback data if no sponsor content is available.
export default function Sponsors({ content = FALLBACK }) {
  const sponsors = content ?? FALLBACK;
// Local state for the marquee interaction, not for fetching data.
// App handles the API request.
  const [paused, setPaused] = useState(false);
  const [activeSponsor, setActiveSponsor] = useState(null);
// Click a sponsor name pauses and highlights is. Clicking the same sponsor name again resumes the animation.
  function handleSponsorClick(index) {
    if (paused && activeSponsor === index) {
      setPaused(false);
      setActiveSponsor(null);
    } else {
      setPaused(true);
      setActiveSponsor(index);
    }
  }

  return (
    <section className="sponsors" aria-label="Sponsors">
      <h2 className="sponsors_label">Presentert sammen med · Presented with</h2>

      <div className={`sponsors_marquee ${paused ? "sponsors_paused" : ""}`}>
        <div className="sponsors_track">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <span
              key={`${sponsor.name}-${index}`}
              className={`sponsors_name ${
                activeSponsor === index % sponsors.length && paused
                  ? "sponsors_name--active"
                  : ""
              }`}
              style={ FONT_TOKENS[sponsor.font] ?? FONT_TOKENS.grotesk }
              onClick={() => handleSponsorClick(index % sponsors.length)}
              aria-hidden={index >= sponsors.length}
              >
                {sponsor.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

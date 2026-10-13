/* Lineup - Issues #9 and #10: the line-up section.

Two headliners in a wide row, the support acts in a grid below, and the
"to be revealed" block at the bottom.

Note what is NOT here: a second card component. There is one ArtistCard, and
this file renders it once per artist with different props. Add an artist to the
content JSON and a new card appears - nothing in this file has to change.

Every artist comes from the backend. There is deliberately no hardcoded
line-up in here: an artist who has been dropped from the real bill must never
be able to reappear on the poster because a copy of the old list was left in a
component. The only thing this file falls back to is the section heading.
*/

import ArtistCard from "./ArtistCard.jsx";
import "./Lineup.css";

// Labels only - never content. If the request fails we still want a heading
// and the right shape on the page, but we do not invent who is playing.
const FALLBACK = {
  title: "Line-up",
  empty: "Line-up kommer / Line-up coming soon",
};

export default function Lineup({ content = {}, onArtistInfo }) {
  // Every field defaults on its own, so a half-built payload renders instead
  // of throwing. `content = {}` only covers the case where App has not heard
  // back from the backend yet.
  const { title = FALLBACK.title, meta = "", artists = [], reveal } = content;

  // ONE array in the JSON, filtered into two groups here. Keeping two separate
  // arrays in the content file would mean two places to edit every time the
  // line-up changes, and two chances to forget one.
  const headliners = artists.filter((artist) => artist.tier === "headliner");
  const support = artists.filter((artist) => artist.tier !== "headliner");

  // The poster draws the second half of the word in outline. The JSON gives
  // the heading as one string, so we split on the hyphen and style the tail.
  // No hyphen in the text, and the whole heading simply renders as it is.
  const [firstPart, ...restParts] = title.split("-");

  return (
    <section className="lineup" aria-labelledby="lineup-title">
      <div className="lineup_head">
        <h2 className="lineup_title" id="lineup-title">
          {firstPart}
          {restParts.length > 0 && <em>{restParts.join("-")}</em>}
        </h2>
        <p className="lineup_meta">{meta}</p>
      </div>

      {/* Nothing from the backend yet, or the request failed. The heading
          above still stands, so the page keeps its shape instead of showing
          a dark empty band - but we say nothing about who is playing. */}
      {artists.length === 0 && <p className="lineup_empty">{FALLBACK.empty}</p>}

      {/* Two grids, same cards. .map() turns an array of data into an array of
          elements - that is the whole of "rendering a list" in React.

          `key` must be stable and unique, so we use artist.id and never the
          array position. With an index, React loses track of which card is
          which the moment the list is reordered. */}
      <div className="lineup_grid lineup_grid--head">
        {headliners.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} onInfo={onArtistInfo} />
        ))}
      </div>

      <div className="lineup_grid lineup_grid--support">
        {support.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} onInfo={onArtistInfo} />
        ))}
      </div>

      {/* Issue #10. Purely presentational - no new React here, just layout. */}
      {reveal && (
        <div className="reveal">
          <span className="reveal_label">{reveal.label}</span>
          <span className="reveal_name">{reveal.name}</span>
          <span className="reveal_label">{reveal.note}</span>
        </div>
      )}
    </section>
  );
}

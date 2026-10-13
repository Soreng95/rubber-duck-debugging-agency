/* ArtistCard - Issue #8: one card, written once, rendered once per artist.

This is the whole point of components. There are eight artists in the line-up
and exactly one card in this file. If you ever catch yourself copying this
markup to make a second kind of card, change a prop instead.

The card takes one artist object straight out of lineup.artists[] and draws it.
It fetches nothing and knows nothing about the section around it, which is what
makes it reusable.
*/

import "./ArtistCard.css";

export default function ArtistCard({ artist, onInfo }) {
  const { name, city, genre, tier } = artist;

  return (
    // Two classes: `card` is everything the cards share, `card--headliner` or
    // `card--support` is the handful of things that differ. One component,
    // two looks - no second file.
    <article className={`card card--${tier}`}>
      <div className="card_row">
        <h3 className="card_name">{name}</h3>

        {/* The card does not know what "info" means, and it must not. It
            reports that the button was pressed and lets its parent decide -
            that separation is why this component can be reused.

            It is a real <button>, so keyboard focus, Enter/Space and screen
            reader announcement come for free. A <div onClick> gives you none
            of that.

            Only drawn when somebody is actually listening. The modal lands in
            #11; until then there is nothing to open, and a button that does
            nothing is worse than no button - especially for a keyboard user,
            who has to tab through it to find out. */}
        {onInfo && (
          <button
            type="button"
            className="card_info"
            onClick={() => onInfo(artist)}
            aria-label={`Mer om ${name} / More about ${name}`}
          >
            i
          </button>
        )}
      </div>

      <p className="card_sub">
        {city} · {genre}
      </p>
    </article>
  );
}

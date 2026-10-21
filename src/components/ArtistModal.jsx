/* ArtistModal - Issues #11 and #12.

One panel, reused by every artist. There are not eight hidden modals in the
page: Lineup holds a single piece of state saying which artist is open, and
this component only exists while that state is not null.

Everything about *when* it is open lives in Lineup. This file is only
concerned with what the panel looks like and how it behaves while it is on
screen - closing, focus, and not letting the page scroll underneath.
*/

import { useEffect, useRef, useState } from "react";
import "./ArtistModal.css";

// The chips are derived, not stored. The API ships `city`, `genre` and a full
// timestamp, and the view decides how to show them - the same reason the date
// is not pre-formatted in the backend. A formatted string in the data is a
// rendering decision that has escaped into the API.
//
// The time is pinned to Oslo on purpose: a festival starts when it starts,
// not at whatever hour it happens to be where the visitor is sitting.
function chipsFor(artist) {
  const chips = [artist.city, artist.genre];

  if (artist.startsAt) {
    chips.push(
      new Date(artist.startsAt).toLocaleTimeString("no-NO", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Oslo",
      }),
    );
  }

  return chips.filter(Boolean);
}

export default function ArtistModal({ artist, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // The artist photos are not in the project yet (issue #2), so the <img> will
  // fail for now. Rather than show the browser's broken-image icon we drop to
  // a plain gradient panel. onError fires once, and the state stops us asking
  // for the same missing file again.
  const [imageFailed, setImageFailed] = useState(false);

  // Move focus into the panel as soon as it opens. Without this a keyboard
  // user presses Enter on the info button and nothing appears to happen -
  // their focus is still out on the page behind the modal.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // The page behind must not scroll while the modal is open, or you end up
  // scrolling the line-up by accident and lose your place. We put the old
  // value back on close rather than assuming it was "visible".
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Escape closes. The listener is added when the modal mounts and removed
  // when it unmounts - that returned function is the cleanup, and skipping it
  // would stack a new listener every time the modal opened.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // aria-modal tells a screen reader "nothing outside this matters right now".
  // For that to be true for a sighted keyboard user as well, Tab must not walk
  // out of the panel. The close button is the only focusable thing in here, so
  // keeping focus is simply a matter of refusing to move it.
  function handleTab(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      closeRef.current?.focus();
    }
  }

  const chips = chipsFor(artist);

  return (
    // The backdrop closes on click. The check is onMouseDown rather than
    // onClick so that a drag which starts inside the panel and ends on the
    // backdrop - selecting bio text, usually - does not close it.
    <div
      className="modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal_panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-name"
        onKeyDown={handleTab}
      >
        <button
          type="button"
          className="modal_close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Lukk / Close"
        >
          ✕
        </button>

        <div className="modal_img">
          {!imageFailed && artist.image && (
            <img
              src={artist.image}
              alt={artist.imageAlt || artist.name}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>

        <div className="modal_body">
          {artist.role && <p className="modal_role">{artist.role}</p>}

          <h3 className="modal_name" id="modal-name">
            {artist.name}
          </h3>

          {chips.length > 0 && (
            <ul className="modal_tags">
              {chips.map((chip) => (
                <li key={chip} className="modal_tag">
                  {chip}
                </li>
              ))}
            </ul>
          )}

          {/* lang tells a screen reader to switch pronunciation. Without it a
              Norwegian sentence is read with an English voice, which is close
              to unintelligible. */}
          {artist.bio?.no && (
            <p className="modal_bio" lang="no">
              {artist.bio.no}
            </p>
          )}

          {artist.bio?.en && (
            <p className="modal_bio modal_bio--en" lang="en">
              {artist.bio.en}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

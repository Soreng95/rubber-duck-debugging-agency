import { useId } from "react";
import"./FaqItem.css";

const mapId = "faq-travel";

// The answers arrive with a pair of *stars* around the words that get the
// highlight colour, so the copy decides which words light up and this file
// only decides how they look. Split on the marker and every odd piece is
// what sat between a pair.
function Highlight({ text }) {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="faq_highlight">{part}</span>
    ) : (
      part
    )
  );
}

export default function FaqItem({ item, venue, isOpen, onToggle}) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  const coordinates = venue?.coordinates;
  const showMap = item.id === mapId && coordinates;

  return (
    <div className={`faq_item ${isOpen ? "is-open" : ""}`}>
       <h3 className="faq_heading">
      <button
        type="button"
        id={buttonId}
        className="faq_question"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="faq_question-text">
          <span className="faq_question-no" lang="no">{item.q.no}</span>
          <span className="faq_question-en" lang="en">{item.q.en}</span>
        </span>
        <span className="faq_icon" aria-hidden="true">
          {isOpen ? "×" : "+"}
        </span>
      </button>
</h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`faq_answer ${isOpen ? "is-open" : ""}`}
        inert={!isOpen}
      >
       <div className="faq_answer-inner">
  {showMap && (
    <div className="faq_venue">
      <p className="faq_venue-name">{venue.name}</p>
      <p className="faq_venue-address">{venue.address}</p>
    </div>
  )}

          <p lang="no"><Highlight text={item.a.no} /></p>
          <p lang="en"><Highlight text={item.a.en} /></p>

          {showMap && (
            <iframe
              className="faq_map"
              title={`Kart: ${venue.name}, ${venue.address}`}
              src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
/>
          )}
        </div>
      </div>
    </div>
  );
}
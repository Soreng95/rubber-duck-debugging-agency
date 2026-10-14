import "./Hero.css";

const FALLBACK = {
  eyebrow: "En natt / One night — 17.10.2026",
  venue: "Sentrum Scene, Oslo",
  titleMain: "STØY",
  titleYear: "26",
  image: "/images/hero.jpg",
  imageAlt: "Publikum i motlys foran en opplyst scene",
  scrollCue: "Scroll",
};

export default function Hero({ content = {}, meta }) {
  // Each field falls back independently if the API data is missing.
  const {
    image = FALLBACK.image,
    imageAlt = FALLBACK.imageAlt,
    titleMain = FALLBACK.titleMain,
    eyebrow = FALLBACK.eyebrow,
    titleYear = FALLBACK.titleYear,
    scrollCue = FALLBACK.scrollCue,
  } = content;

  // Get venue name from meta, add Oslo, or use the fallback if missing.
const venue = meta?.venue?.name
  ? `${meta.venue.name}, Oslo`
  : FALLBACK.venue;

  return (
    <header className="hero" data-screen-label="Hero">
{/* Changed from <section> to <header> to better reflect the semantic role of the hero section*/}

{/* Background image fills the hero without distortion. */}
      <div className="hero__bg">
        <img src={image} alt={imageAlt} />
      </div>
{/* Overlay layers improve contrast and add visual effects. */}
      <div className="hero__scrim"></div>
      <div className="hero__scan"></div>

      <div className="hero__inner">
        <p className="hero__pretitle">Noroff Presents</p>
        <h1 className="neon neon--title">{titleMain}</h1>

        <div className="neon neon--26">
          <span className="slash">/</span>
          {titleYear}
        </div>
{/* Display the date and venue beneath the festival title. */}
        <p className="hero__eyebrow">
          {eyebrow} — {venue}
        </p>
      </div>

      <div className="hero__cue">
        <span>{scrollCue}</span>
        <span aria-hidden="true">↓</span>
      </div>
    </header>
  );
}

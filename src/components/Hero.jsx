/* Add the small Scroll ↓ hint at the bottom of the hero, with a gentle looping animation. */
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__cue">
        {/* replace "scroll" with data when JSON is available */}
        <span>Scroll</span>
        <span aria-hidden="true">↓</span>
      </div>
    </div>
  );
}
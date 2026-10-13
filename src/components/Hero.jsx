/* Add the small Scroll ↓ hint at the bottom of the hero, with a gentle looping animation. */
import { useEffect, useState } from "react";
import "./Hero.css";

const HERO_API = "https://stoy26.vercel.app/content/hero";

export default function Hero() {
  const [heroInfo, setHeroInfo] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      try{
        const response = await fetch(HERO_API);
        if(!response.ok) {
          throw new Error (`API Error! Status ${response.status}`);
        }

        const result = await response.json();

        setHeroInfo(result);

      }catch(error){
        console.error(error)
      }
    }
    fetchHero();
  }, []);

  return heroInfo && (
    <section className="hero">
      <div className="hero__cue">
        <span>{heroInfo.scrollCue}</span>
        <span aria-hidden="true">↓</span>
      </div>
    </section>
  );
}


import { useState, useEffect, useRef } from "react";
import FaqItem from "./FaqItem.jsx";

const outline = "mål";

export default function Faq({content, meta}) {
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);

useEffect(() => {
  if (openId === null) return;

  const close = () => setOpenId(null);

  const onPointerDown = (e) => {
    if (!sectionRef.current?.contains(e.target)) close();
  };
  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
  };
  const onFocusIn = (e) => {
    if (!sectionRef.current?.contains(e.target)) close();
  };

  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("focusin", onFocusIn);
  return () => {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("focusin", onFocusIn);
  };
}, [openId]);



  if (!content) return <p>There is no content to show</p>;
const [noRaw = "", enRaw = ""] = content.title.split("/");
const no = noRaw.trim().normalize("NFC");
const en = enRaw.trim().normalize("NFC");
const hasOutline = no.endsWith(outline);
const noStart = hasOutline ? no.slice(0, -outline.length) : no;

  return (
  <section className="faq" aria-labelledby="faq-title" ref={sectionRef}>
       <h2 className="faq_title" id="faq-title">
        {noStart}
        {hasOutline && <em className="faq_title-outline">{outline}</em>}
        {en && (
          <span className="faq_title-en">
            <span className="faq_title-slash">/</span>
            {en}
          </span>
        )}
      </h2>
      {content.items.map((item) => (
        <FaqItem 
        key={item.id} 
        item={item} 
        venue={meta?.venue}
        isOpen={openId === item.id}
        onToggle={() => setOpenId(openId === item.id ? null : item.id)}  />
      ))}
    </section>
  );
}
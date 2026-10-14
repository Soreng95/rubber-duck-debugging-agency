import { useState } from "react";
import FaqItem from "./FaqItem.jsx";

export default function Faq({content, meta}) {
  const [openId, setOpenId] = useState(null);


  if (!content) return <p>Loading…</p>;

  return (
  <section className="faq">
      <h2>{content.title}</h2>
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
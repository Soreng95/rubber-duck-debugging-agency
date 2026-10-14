import { useState } from "react";
import FaqItem from "./FaqItem.jsx";

export default function Faq({content, meta}) {
  const [openId, setOpenId] = useState(null);


  if (!content) return <p>Loading…</p>;

  return (
    <>
      <h2>Spørsmål</h2>  
      <h3>{content.title}</h3>
      {content.items.map((item) => (
        <FaqItem 
        key={item.id} 
        item={item} 
        venue={meta?.venue}
        isOpen={openId === item.id}
        onToggle={() => setOpenId(openId === item.id ? null : item.id)}  />
      ))}
    </>
  );
}
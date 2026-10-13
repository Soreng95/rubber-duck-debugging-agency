import { useState, useEffect } from "react";
import FaqItem from "./FaqItem.jsx";

export default function Faq() {
  const [faq, setFaq] = useState(null);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://stoy26.vercel.app/content/faq", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setFaq)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://stoy26.vercel.app/content/meta", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setMeta)
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (error) return <p>Could not load FAQ: {error}</p>;
  if (!faq) return <p>Loading…</p>;

  return (
    <>
      <h2>Spørsmål</h2>  
      <h3>{faq.title}</h3>
      {faq.items.map((item) => (
        <FaqItem key={item.id} item={item} venue={meta?.venue}
        isOpen={openId === item.id}
        onToggle={() => setOpenId(openId === item.id ? null : item.id)}  />
      ))}
    </>
  );
}
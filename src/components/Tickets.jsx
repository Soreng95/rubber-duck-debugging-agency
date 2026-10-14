/*
Tickets.jsx - Issue #13. the static ticket (Hana)
----------------------------------------------------
The main body is on the left. a perforated tear line, stub on the right.
There is no behavior yet, the form (#14), drag (#15), and state (#16) will come later.

Text comes from the content JSON. Until Emil's backend is ready we use PLACEHOLDER below - swap
it for real data when it is available.
*/

import "./Tickets.css";

// TODO: replace this with real data from the backend when it is ready
const PLACEHOLDER = {
  title: "Sikre plassen",
  meta: "Fyll inn - dra stubben for å sikre billetten din / Fill in - drag the stub to secure your ticket",
  tag: "En natt - Admit one - 17.10.2026",
  name: "STØY",
  edition: "/26",
  info: "Sentrum Scene, Oslo - Doors: 18:00 - 16+",
  price: { label: "Fra / From", amount: "690 NOK", note: "Early bird til 31.08" },
  stub: { label: "Drag to claim" },
};

export default function Tickets({ content = PLACEHOLDER }) {
    const { title, meta, tag, name, edition, info, price, stub } = content;

    return (
        <section className="tickets" aria-labelledby="tickets-title">
            <div className="tickets_head">
                <h2 className="tickets_title" id="tickets-title">{title}</h2>
                <p className="tickets_meta">{meta}</p>
            </div>

            <div className="ticket">
                {/* The main body of the ticket */}
                <div className="ticket_main">
                    <p className="ticket_tag">{tag}</p>
                    <p className="ticket_name">{name}
                        <span>{edition}</span>
                    </p>
                    <p className="ticket_info">{info}</p>

                    {/* #14 adds the email+ phone field here */}

                    <p className="ticket_price">
                        <span>{price.label}</span>
                        <b>{price.amount}</b>
                        <span>{price.note}</span>
                    </p>
                </div>

                {/* Tear line: a repeating gradient of dots */}
                <div className="ticket_perf" aria-hidden="true" />

                {/* Stub - #15 adds the drag behavior here, #16 adds the done behavior */}
                <div className="ticket_stub">
                    <span className="ticket_arrow" aria-hidden="true">⇨</span>
                    <span className="ticket_stub-label">{stub.label}</span>
                </div>
            </div>
        </section> 
    );
}
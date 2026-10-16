/*
Tickets.jsx - Issue #13. the static ticket (Hana)
----------------------------------------------------
The main body is on the left. a perforated tear line, stub on the right.
There is no behavior yet, the form (#14), drag (#15), and state (#16) will come later.

Text comes from the content JSON. Until Emil's backend is ready we use PLACEHOLDER below - swap
it for real data when it is available.
*/

import {useRef, useState} from "react";
import "./Tickets.css";

const DRAG_DISTANCE = 130 // full drag
const TAP_THRESHOLD = 0.05 // below this is a tap/click
const CLAIM_THRESHOLD = 0.6 // past this the drag claims

// TODO: replace this with real data from the backend when it is ready
const PLACEHOLDER = {
  title: "Sikre plassen",
  meta: "Fyll inn - dra stubben for å sikre billetten din / Fill in - drag the stub to secure your ticket",
  tag: "En natt - Admit one - 17.10.2026",
  name: "STØY",
  edition: "/26",
  info: "Sentrum Scene, Oslo - Doors: 18:00 - 16+",
  price: {
    label: "Fra / From",
    from: { amountMinor: 69000, currency: "NOK" },
    note: "Early bird til 31.08",
  },
  stub: { label: "Drag to claim" },
  fields: {
    email: {
    label: "E-post / Email",
    placeholder: "navn@epost.no",
    invalid: "Skriv inn en gyldig e-post / Enter a valid email",
  },
  phone: {
    label: "Telefon / Phone",
    placeholder: "+47 123 45 678",
    invalid: "Skriv inn et gyldig telefonnummer / Enter a valid phone number",
  },
 },
  claimed: {
    title: "Plassen er sikret",
    note: "Vi sender bekreftelse på e-post / Confirmation is on its way",
  },
};

// The API never sends a ready-made price string. It sends an integer in minor
// units - 69000, not 690 - plus a currency code, because integers do not drift
// the way decimals do once anything adds a booking fee. Turning that into text
// is the view's job, and where the symbol goes is part of the decision:
// Norwegian writes "690 kr", English writes "NOK 690".
function formatPrice(from) {
  if (!from) return "";

  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: from.currency,
    maximumFractionDigits: 0,
  }).format(from.amountMinor / 100);
}

// returns "email", "phone" or null (= everything is valid)
function findInvalidField(email, phone) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return "email";

    //remove spaces, then: 8 digits, or + country code and 8+ digits, or 10+ digits 
    const digits = phone.replace(/[\s\-()]/g, "");
    if (!/^(\d{8}|\+?\d{10,})$/.test(digits)) return "phone";

    return null;
}

export default function Tickets({ content = PLACEHOLDER }) {
    const { 
        title, meta, tag, name, edition, info,
        price = PLACEHOLDER.price, 
        stub = PLACEHOLDER.stub, 
        fields = PLACEHOLDER.fields,
        claimed: claimedText = PLACEHOLDER.claimed,
     } = content;

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorField, setErrorField] = useState(null); 

    const [claimed, setClaimed] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [tear, setTear] = useState(0); // 0 -> 1, how far the stub is dragged

    const drag = useRef(null); // start position
    const justDragged = useRef(false); // stops the click after a drag from submitting twice

    // shared by drag, Enter and click
    function tryClaim() {
        if (claimed) return;
        const invalid = findInvalidField(email, phone);
        setErrorField(invalid);
        if (!invalid) setClaimed(true);
    }
    
    function handleSubmit(e) {
        e.preventDefault(); // prevent the form from actually submitting and reloading the page
        if (justDragged.current) return; // drag already handled it
        tryClaim();
    }

    function handlePointerDown(e) {
        if (claimed) return;
        e.currentTarget.setPointerCapture(e.pointerId); // keeps events even if pointer leaves the stub
        drag.current = { x: e.clientX, prog: 0 };
        setDragging(true);
    }

    function handlePointerMove(e) {
        if (!drag.current) return;
        const distance = e.clientX - drag.current.x; // always horizontal
        const prog = Math.min(1, Math.max(0, distance / DRAG_DISTANCE));
        drag.current.prog = prog;
        setTear(prog);
    }

    function handlePointerUp() {
        if (!drag.current) return;
        const prog = drag.current.prog;
        drag.current = null;
        setDragging(false);
        setTear(0); // always spring back; claimed CSS handles the torn off position

        if (prog > TAP_THRESHOLD) {
            // real drag, not a tap -> ignore the click that follows
            justDragged.current = true;
            setTimeout(() => (justDragged.current = false), 50);
        }
        if (prog > CLAIM_THRESHOLD) tryClaim(); // past 60% -> try to claim
    }

    return (
        <section className="tickets" aria-labelledby="tickets-title">
            <div className="tickets_head">
                <h2 className="tickets_title" id="tickets-title">{title}</h2>
                <p className="tickets_meta">{meta}</p>
            </div>

            <form 
            className={`ticket ${dragging ? "dragging" : ""} ${claimed ? "claimed" : ""}`}
            style={{ "--tear" : tear }}
            onSubmit={handleSubmit}
            noValidate
            >

                {/* The main body of the ticket */}
                <div className="ticket_main">
                    <p className="ticket_tag">{tag}</p>
                    <p className="ticket_name">{name}
                        <span>{edition}</span>
                    </p>
                    <p className="ticket_info">{info}</p>

                    <div className="ticket_fields">
                        <div className="field">
                            <label htmlFor="tk-email">{fields.email.label}</label>
                            <input 
                            id="tk-email"
                            type="email"
                            autoComplete="email"
                            placeholder={fields.email.placeholder} 
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errorField === "email") setErrorField(null);
                            }}
                            aria-invalid={errorField === "email"}
                            aria-describedby="tk-error"
                            />
                        </div>

                            <div className="field">
                                <label htmlFor="tk-phone">{fields.phone.label}</label>
                                <input 
                                id="tk-phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder={fields.phone.placeholder}
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (errorField === "phone") setErrorField(null);
                                }}
                                aria-invalid={errorField === "phone"}
                                aria-describedby="tk-error"
                            />
                        </div>
                    </div>

                    <p className="ticket_price">
                        <span>{price.label}</span>
                        <b>{formatPrice(price.from)}</b>
                        <span>{price.note}</span>
                    </p>

                    <p id="tk-error"
                    className={`ticket_error ${claimed ? "is-success" : ""}`}
                    aria-live="polite"
                    >
                        {claimed
                        ? `${claimedText.title} - ${claimedText.note}`
                        : errorField && fields[errorField].invalid}
                    </p>
                </div>

                {/* Tear line: a repeating gradient of dots */}
                <div className="ticket_perf" aria-hidden="true" />

                {/* Stub: a real button, so it works with drag (#15), Enter and space and click */}
                <button
                type="submit"
                className="ticket_stub"
                aria-disabled={claimed}
                aria-label={claimed ? "Billett sikret / Ticket claimed" : "Sikre billett / Claim ticket"}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                >
                
                {claimed ? (
                    <span className="ticket_stub-done" aria-hidden="true">
                        <span className="ticket_tick">✓</span>
                        <span className="ticket_done-title">{claimedText.title}</span>
                        <span className="ticket_done-note">{claimedText.note}</span>
                    </span>
                ) : (
                    <>
                    <span className="ticket_arrow" aria-hidden="true">⇨</span>
                    <span className="ticket_stub-label">{stub.label}</span>
                    </>
                )}
                </button>
            </form>
        </section> 
    );
}
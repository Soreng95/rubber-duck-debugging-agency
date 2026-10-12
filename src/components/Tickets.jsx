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
};

// returns "email", "phone" or null (= everything is valid)
function findInvalidField(email, phone) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return "email";

    //remove spaces, then: 8 digits, or + country code and 8+ digits
    const digits = phone.replace(/\s/g, "");
    if (!/^(\d{8}|\+\d{10,})$/.test(digits)) return "phone";

    return null;
}

export default function Tickets({ content = PLACEHOLDER }) {
    const { title, meta, tag, name, edition, info, price, stub, fields } = content;

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
        drag.current = { x: e.clientX, y: e.clientY, prog: 0 };
        setDragging(true);
    }

    function handlePointerMove(e) {
        if (!drag.current) return;
        // desktop: drag right - mobile stacked: drag down
        const isMobile = window.matchMedia("(max-width: 560px)").matches;
        const distance = isMobile ? e.clientY - drag.current.y : e.clientX - drag.current.x;
        const prog = Math.min(1, Math.max(0, distance / 130));
        drag.current.prog = prog;
        setTear(prog);
    }

    function handlePointerUp() {
        if (!drag.current) return;
        const prog = drag.current.prog;
        drag.current = null;
        setDragging(false);
        setTear(0); // always spring back; claimed CSS handles the torn off position

        if (prog > 0.05) {
            // real drag, not a tap -> ignore the click that follows
            justDragged.current = true;
            setTimeout(() => (justDragged.current = false), 50);
        }
        if (prog > 0.06) tryClaim(); // past 60% -> try to claim
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
                        <b>{price.amount}</b>
                        <span>{price.note}</span>
                    </p>

                    <p id="tk-error" className="ticket_error" aria-live="polite">
                        {errorField && fields[errorField].invalid}
                    </p>
                </div>

                {/* Tear line: a repeating gradient of dots */}
                <div className="ticket_perf" aria-hidden="true" />

                {/* Stub: a real button, so it works with drag (#15), Enter and space and click */}
                <button
                type="submit"
                className="ticket_stub"
                disabled={claimed}
                aria-label={claimed ? "Billett sikret / Ticket claimed" : "Sikre billett / Claim ticket"}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                >
                    <span className="ticket_arrow" aria-hidden="true">⇨</span>
                    <span className="ticket_stub-label">{stub.label}</span>
                </button>
            </form>
        </section> 
    );
}
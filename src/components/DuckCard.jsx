// ============================================================
//  4. DuckCard — props, conditional rendering, and a callback
// ============================================================
//
//  This one puts three things together, and it is the pattern you will
//  use constantly in real work:
//
//    - it receives DATA through props            (name, role, busy)
//    - it shows different UI depending on that data   (conditional rendering)
//    - it reports clicks BACK UP to its parent    (the onHire prop)
//
//  Notice what this component does NOT do: it does not decide whether the
//  duck is busy. It is handed that information and just draws it. That makes
//  it reusable and easy to reason about. Components that only draw what they
//  are given are sometimes called "dumb" or "presentational" components, and
//  that is a compliment.

import Button from "./Button.jsx";
import styles from "./DuckCard.module.css";

export default function DuckCard({ name, role, busy, onHire }) {
  return (
    <article className={styles.card}>
      <div>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
      </div>

      {/* ------------------------------------------------------------
          CONDITIONAL RENDERING with a ternary
          ------------------------------------------------------------
          Pick between two different pieces of JSX. Read it as:
             busy ? (show this) : (show that)

          This is how you do an if/else inside JSX. You cannot write a
          normal `if` statement in the middle of JSX — but a ternary is
          an expression, so it is allowed.  */}
      {busy ? (
        <span className={styles.badge}>Busy debugging</span>
      ) : (
        /* ------------------------------------------------------------
           CALLING BACK UP TO THE PARENT
           ------------------------------------------------------------
           `onHire` is a function that App.jsx gave us. We do not know
           and do not care what it does — we just call it when the
           button is clicked.

           Why the arrow function?
               onClick={() => onHire(name)}
           Because we want to PASS AN ARGUMENT. Writing onHire(name)
           directly would call it instantly while rendering. Wrapping it
           in () => ... creates a new function that calls it later,
           when the click actually happens. */
        <Button text="Hire" onClick={() => onHire(name)} />
      )}
    </article>
  );
}

// ------------------------------------------------------------
//  The direction things flow — worth drawing on paper once
// ------------------------------------------------------------
//
//      App.jsx  ---- data (name, role, busy) ---->  DuckCard
//      App.jsx  <---- events (onHire) --------------  DuckCard
//
//  Data goes DOWN through props. Events come BACK UP through functions.
//  This is called "one-way data flow", and it is the core idea of React.
//
// ------------------------------------------------------------
//  TRY IT YOURSELF
// ------------------------------------------------------------
//  1. Add a `pricePerHour` prop and show it on the card.
//  2. Show a "Fire" button when the duck IS busy, and make it call a new
//     `onFire` prop. You will need to add that function in App.jsx too.

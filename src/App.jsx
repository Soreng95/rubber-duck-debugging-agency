// ============================================================
//  src/App.jsx — the top component of the whole app
// ============================================================
//
//  main.jsx renders <App />, and App renders everything else. So this file
//  is the root of your component tree:
//
//      App
//      ├── SimpleButton
//      ├── Button × 3
//      ├── Counter
//      └── DuckList
//          └── DuckCard × 4
//
//  Read the five components in src/components in order (they are numbered).
//  Each one introduces exactly one new idea.

import { useState } from "react";

import SimpleButton from "./components/SimpleButton.jsx";
import Button from "./components/Button.jsx";
import Counter from "./components/Counter.jsx";
import DuckList from "./components/DuckList.jsx";

import styles from "./App.module.css";

// ------------------------------------------------------------
//  Our starting data
// ------------------------------------------------------------
//  Just a normal JavaScript array of objects. In a real app this would come
//  from a database or an API, but the component code would be identical —
//  which is exactly why we separate data from the components that draw it.
//
//  It lives outside the component because it never changes. If we wrote it
//  inside App(), a brand new array would be created on every single render.
const INITIAL_DUCKS = [
  { id: 1, name: "Sir Quacks-a-lot", role: "Senior Rubber Duck", busy: false },
  { id: 2, name: "Debuggy", role: "Null Pointer Specialist", busy: false },
  { id: 3, name: "Lord Floatsworth", role: "CSS Whisperer", busy: true },
  { id: 4, name: "Mallard Hughes", role: "Async Therapist", busy: false },
];

export default function App() {
  // ------------------------------------------------------------
  //  "Lifting state up"
  // ------------------------------------------------------------
  //  The duck list lives HERE, in App — not inside DuckList or DuckCard.
  //
  //  Why? Because a DuckCard needs to change the list when you hire a duck,
  //  and a component can never change its own props. So the state has to
  //  live in the closest component that is above everyone who needs it.
  //
  //  That is the rule: put state in the nearest shared parent, then pass it
  //  down. React people call this "lifting state up", and you will do it
  //  constantly. It is also the thing that trips everyone up at first, so
  //  if this file is the one you reread, that is normal.
  const [ducks, setDucks] = useState(INITIAL_DUCKS);

  // ------------------------------------------------------------
  //  Changing state based on the old state
  // ------------------------------------------------------------
  //  This function gets passed down to every DuckCard as the `onHire` prop.
  //  When a card's button is clicked, this runs up here instead.
  function handleHire(name) {
    // We do NOT do this:
    //     duck.busy = true
    // Changing the existing objects is called "mutating", and React would
    // not notice — it compares the old value with the new one, and a
    // mutated array is still the same array.
    //
    // So instead we build a BRAND NEW array with .map(), where the matching
    // duck is replaced by a copy with busy: true.
    //
    // `{ ...duck, busy: true }` is the spread syntax: "copy every field from
    // duck, then override busy". Everything else stays as it was.
    setDucks(
      ducks.map((duck) =>
        duck.name === name ? { ...duck, busy: true } : duck,
      ),
    );
  }

  function handleReset() {
    setDucks(INITIAL_DUCKS);
  }

  // How many are still free? Plain JavaScript, recalculated on every render.
  // There is no need to store this in state — it can always be derived from
  // `ducks`. Rule of thumb: if you can calculate it, do not store it.
  const availableCount = ducks.filter((duck) => !duck.busy).length;

  return (
    // A component must return ONE element, so everything is wrapped in
    // <div>. If you do not want an extra tag in the HTML, use an empty
    // "fragment" instead: <> ... </>
    <div className={styles.page}>
      {/* This is how you write a comment inside JSX. */}

      <header>
        <h1 className={styles.title}>Rubber Duck Debugging Agency 🦆</h1>
        <p className={styles.intro}>
          Change the heading in <code>src/App.jsx</code>, press save, and watch
          the browser update by itself. Then open the five components in{" "}
          <code>src/components</code> and read them in order.
        </p>
      </header>

      {/* --------------------------------------------------------
          1. A component with no props — always looks the same.
          -> components/SimpleButton.jsx
      -------------------------------------------------------- */}
      <section className={styles.section}>
        <h2 className={styles.heading}>1. A component without props</h2>
        <SimpleButton />
      </section>

      {/* --------------------------------------------------------
          2. ONE component, reused with different props.
             This is the entire point of components.
          -> components/Button.jsx
      -------------------------------------------------------- */}
      <section className={styles.section}>
        <h2 className={styles.heading}>2. One component, different props</h2>
        <div className={styles.row}>
          {/* text and variant are props, written like HTML attributes */}
          <Button text="Primary" variant="primary" />
          <Button text="Secondary" variant="secondary" />
          {/* variant is optional, so this falls back to "primary" */}
          <Button text="No variant given" />
        </div>
        {/* A true/false prop written on its own means `true` */}
        <Button text="Full width" fullWidth />
      </section>

      {/* --------------------------------------------------------
          3. State: a component that remembers something.
          -> components/Counter.jsx
      -------------------------------------------------------- */}
      <section className={styles.section}>
        <h2 className={styles.heading}>3. State with useState</h2>
        <Counter />
      </section>

      {/* --------------------------------------------------------
          4 + 5. A list built from data, and state lifted up to App.
             Click "Hire" and watch handleHire above run.
          -> components/DuckList.jsx and components/DuckCard.jsx
      -------------------------------------------------------- */}
      <section className={styles.section}>
        <h2 className={styles.heading}>4. A list from data, with state</h2>
        <p className={styles.meta}>
          {availableCount} of {ducks.length} ducks available
        </p>

        {/* `ducks` goes DOWN as data. `handleHire` goes down as a function,
            so the cards can send events back UP to this file. */}
        <DuckList ducks={ducks} onHire={handleHire} />

        {/* Only show Reset once at least one duck is busy. */}
        {availableCount < ducks.length && (
          <Button text="Reset the ducks" variant="secondary" onClick={handleReset} />
        )}
      </section>
    </div>
  );
}

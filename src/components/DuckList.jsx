// ============================================================
//  5. DuckList — turning an ARRAY into components with .map()
// ============================================================
//
//  Real apps do not hardcode ten cards. They get a list of data and draw
//  one component per item. In React you do that with .map() — the same
//  array method you already know from plain JavaScript.
//
//  .map() takes an array and gives you back a new array where every item
//  has been transformed. Normally you map numbers to numbers:
//
//      [1, 2, 3].map((n) => n * 2)        ->  [2, 4, 6]
//
//  In React you map DATA to JSX:
//
//      ducks.map((duck) => <DuckCard ... />)   ->  [<DuckCard/>, <DuckCard/>]
//
//  And React is happy to render an array of elements. That is the trick.

import DuckCard from "./DuckCard.jsx";
import styles from "./DuckList.module.css";

export default function DuckList({ ducks, onHire }) {
  // ------------------------------------------------------------
  //  Handle the empty case first
  // ------------------------------------------------------------
  //  A normal `if` IS allowed here, because we are above the return —
  //  this is just regular JavaScript. Returning early like this is
  //  cleaner than nesting another ternary in the JSX below.
  if (ducks.length === 0) {
    return <p className={styles.empty}>No ducks available. Everyone is busy.</p>;
  }

  return (
    <div className={styles.list}>
      {/* The curly braces drop us into JavaScript, we .map() the array,
          and React renders whatever comes back. */}
      {ducks.map((duck) => (
        <DuckCard
          /* ------------------------------------------------------------
             `key` — the one prop you must not forget
             ------------------------------------------------------------
             Whenever you render a list, every item needs a unique `key`.
             React uses it to keep track of which item is which, so that
             when the list changes it can update just the one that moved
             instead of redrawing everything.

             Leave it out and React prints a warning in the console
             (open DevTools with F12 and try it — it is worth seeing once).

             Use something stable and unique, like a database id.
             Do NOT use the array index if the list can be reordered. */
          key={duck.id}
          /* Everything below is just normal props going down to DuckCard. */
          name={duck.name}
          role={duck.role}
          busy={duck.busy}
          onHire={onHire}
        />
      ))}
    </div>
  );
}

// ------------------------------------------------------------
//  TRY IT YOURSELF
// ------------------------------------------------------------
//  1. Sort the ducks so the available ones come first.
//     Hint: [...ducks].sort(...) — copy the array first, do not sort the
//     prop itself. Mutating props is a bug waiting to happen.
//  2. Show a count above the list: "3 of 4 ducks available".
//  3. Use .filter() to show only the available ducks.

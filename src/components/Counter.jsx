// ============================================================
//  3. Counter — a component that REMEMBERS something (state)
// ============================================================
//
//  Props come from outside and the component cannot change them.
//  But a component often needs to remember something of its own:
//  how many times you clicked, what you typed, whether a menu is open.
//
//  That memory is called STATE, and you create it with useState.
//
//  useState is a "hook" — a function from React that starts with `use`.
//  Two rules about hooks, and breaking them is a real error:
//    1. Only call them at the TOP of a component function.
//    2. Never inside an if, a loop, or another function.

import { useState } from "react";
import styles from "./Counter.module.css";

export default function Counter() {
  // ------------------------------------------------------------
  //  Creating state
  // ------------------------------------------------------------
  //  useState(0) returns an array of exactly two things, and we
  //  destructure them into two variables:
  //
  //      count    -> the current value (starts at 0)
  //      setCount -> the ONLY way you are allowed to change it
  //
  //  The names are up to you, but `x` / `setX` is the convention.
  const [count, setCount] = useState(0);

  // ------------------------------------------------------------
  //  THE most important thing on this page
  // ------------------------------------------------------------
  //  You never write `count = count + 1`.
  //
  //  If you did, the variable would change but the screen would not —
  //  React has no way of knowing anything happened.
  //
  //  Instead you call setCount(...). That tells React:
  //      "the value changed, run this component function again"
  //  React re-runs Counter(), gets the new JSX, and updates only the
  //  part of the page that actually changed.
  //
  //  Call setCount, get a redraw. Assign directly, get nothing.

  function handleClick() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className={styles.wrapper}>
      {/* onClick takes the FUNCTION, not a call to it.
          onClick={handleClick}    correct — hand React the function
          onClick={handleClick()}  wrong — runs it immediately on render */}
      <button className={styles.button} onClick={handleClick}>
        {/* A ternary right inside the text, so we get "1 time" but
            "2 times". Small thing, but this is the normal way to put
            logic into the middle of a sentence in JSX. */}
        Clicked {count} {count === 1 ? "time" : "times"}
      </button>

      {/* Conditional rendering with `&&`:
          "if count > 0 is true, render what comes after".
          If it is false, React renders nothing at all.
          So the Reset button only exists once you have clicked. */}
      {count > 0 && (
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  );
}

// ------------------------------------------------------------
//  TRY IT YOURSELF
// ------------------------------------------------------------
//  1. Add a second button that counts DOWN.
//  2. Stop it from going below zero.
//  3. Add a line that shows "That is a lot of ducks!" when count > 10.

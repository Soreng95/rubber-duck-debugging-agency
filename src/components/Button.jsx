// ============================================================
//  2. Button — a component that takes PROPS
// ============================================================
//
//  SimpleButton always looks the same. Boring. We normally want ONE
//  button component that we can reuse with different text and colours.
//
//  The values you hand into a component are called "props"
//  (short for properties). They work exactly like arguments to a
//  normal JavaScript function:
//
//      function greet(name)      ->   greet("Emil")
//      function Button({ text })  ->   <Button text="Send" />
//
//  The only difference is how you write them: as attributes in JSX.

import styles from "./Button.module.css";

// ------------------------------------------------------------
//  Receiving props
// ------------------------------------------------------------
//  React always hands a component ONE object, like:
//      { text: "Save", variant: "primary" }
//
//  The curly braces in the function arguments is normal JavaScript
//  destructuring — it pulls the individual values out of that object.
//  These two are the same thing:
//
//      function Button(props)      { ... props.text ... }
//      function Button({ text })   { ... text ... }
//
//  `variant = "primary"` is a DEFAULT VALUE: if nobody passes a variant,
//  it becomes "primary" by itself.
export default function Button({
  text,
  variant = "primary",
  fullWidth = false,
  onClick,
}) {
  // ------------------------------------------------------------
  //  Using a prop to pick a CSS class
  // ------------------------------------------------------------
  //  styles.primary and styles.secondary are both defined in the .css file.
  //  Here we choose between them with a ternary — a short if/else:
  //
  //      condition ? valueIfTrue : valueIfFalse
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;

  // Same trick again: if fullWidth is true we add the class,
  // otherwise we add an empty string (= no extra class).
  const widthClass = fullWidth ? styles.fullWidth : "";

  // ------------------------------------------------------------
  //  Returning the JSX
  // ------------------------------------------------------------
  //  Curly braces { } inside JSX mean: "stop writing HTML, run some
  //  JavaScript here, and put the result in".
  //
  //  The backticks ` ` make a template string, so we can glue several
  //  class names together into one className.
  return (
    <button
      className={`${styles.button} ${variantClass} ${widthClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// ------------------------------------------------------------
//  Note on `onClick`
// ------------------------------------------------------------
//  We did not write any click logic in here. We just pass the `onClick`
//  prop straight through to the real <button>.
//
//  That means whoever USES this component decides what a click does:
//
//      <Button text="Hire" onClick={() => alert("Hired!")} />
//
//  Passing a function as a prop is one of the most important patterns in
//  React. You will see it again in DuckCard.jsx.
//
// ------------------------------------------------------------
//  TRY IT YOURSELF
// ------------------------------------------------------------
//  1. Add a `size` prop that can be "small" or "large".
//  2. Add matching .small / .large rules in Button.module.css.
//  3. Pick the class with a ternary, like variantClass above.
//  4. Use it from App.jsx:  <Button text="Big" size="large" />

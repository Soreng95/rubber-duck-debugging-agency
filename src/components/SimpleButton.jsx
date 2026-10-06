// ============================================================
//  1. SimpleButton — the smallest possible component
// ============================================================
//
//  A "component" is just a function that returns HTML.
//  That is the whole idea. No magic.
//
//  Three rules you have to remember:
//
//   1. The name starts with a CAPITAL letter (SimpleButton, not simpleButton).
//      React uses that to tell your components apart from real HTML tags.
//      <button> is HTML. <SimpleButton> is yours.
//
//   2. It returns something that LOOKS like HTML. That is called JSX.
//      It is not HTML — it is JavaScript that React turns into HTML.
//
//   3. `export default` is what lets other files import it.
//
//  In HTML you wrote:   <button class="...">Click me</button>
//  In JSX you write:    <button className="...">Click me</button>
//
//  Why `className` and not `class`? Because `class` is already a reserved
//  word in JavaScript (you used it for `class Dog { ... }`).

// Importing a CSS Module gives us an object of class names.
// styles.button below refers to the `.button` rule in the .css file.
import styles from "./SimpleButton.module.css";

export default function SimpleButton() {
  return <button className={styles.button}>Click me</button>;
}

// This component always looks exactly the same, every time you use it.
// That is its limitation — and the reason props exist. See Button.jsx next.

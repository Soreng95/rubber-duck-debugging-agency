import { useState } from "react";
import Tickets from "./components/Tickets";

export default function App2() {
  const [count, setCount] = useState(0);

  function handleOnclick() {
    setCount(count + 1);
  }

  return (
    <div>
      {/* <Hero />
      <LineUp /> */}
      <Tickets />

    </div>
  );
}

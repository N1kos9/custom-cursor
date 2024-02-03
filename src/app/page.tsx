"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      const { pageX, pageY } = e;
      setCursorX(pageX);
      setCursorY(pageY);

      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const hoverableElements = ["A", "BUTTON", "INPUT"]; // Define hoverable elements
      const isHoverElement =
        elemBelow && hoverableElements.includes(elemBelow.tagName);

      setIsHovering(isHoverElement);
    };

    document.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor ${isHovering ? "hovering" : ""}`}
        style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
      />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white">
        <h1>
          Mouse Position: X: {cursorX}, Y: {cursorY}
        </h1>
        <ul className="">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <button>About</button>
          </li>
          <li>
            <input type="button" value="Contact" />
          </li>
        </ul>
      </main>
    </>
  );
}

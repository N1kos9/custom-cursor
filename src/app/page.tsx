"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State definitions
  const [cursorX, setCursorX] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      setCursorX(pageX);
      setCursorY(pageY);

      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const hoverableElements = ["A", "BUTTON", "INPUT"]; // Define hoverable elements

      // Ensure isHoverElement is strictly a boolean value
      const isHoverElement =
        elemBelow !== null && hoverableElements.includes(elemBelow.tagName);

      setIsHovering(isHoverElement); // isHoverElement is guaranteed to be boolean here
    };

    // Attach event listener
    window.addEventListener("mousemove", updateMousePosition);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
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

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
        <ul className="p-12 flex flex-col items-center">
          <a href="#" className="p-8 mt-12 border border-white rounded-lg">
            I am an anchor tag
          </a>
          <button className="mt-12 p-8 border border-white rounded-lg">
            I am a button
          </button>
          <input
            type="button"
            className="p-8 mt-12 border boder-white rounded-lg"
            value="I am an input"
          />
        </ul>
      </main>
    </>
  );
}

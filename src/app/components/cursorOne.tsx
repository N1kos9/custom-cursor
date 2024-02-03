"use client";

import { useState, useEffect } from "react";

const CursorOne = () => {
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
    <div
      className={`cursor ${isHovering ? "hovering" : ""}`}
      style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
    />
  );
};

export default CursorOne;

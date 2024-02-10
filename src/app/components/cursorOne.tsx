"use client";

import { useState, useEffect } from "react";

const CursorOne = () => {
  const [cursorX, setCursorX] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorX(clientX);
      setCursorY(clientY);

      const elemBelow = document.elementFromPoint(clientX, clientY);
      const hoverableElements = ["A", "BUTTON", "INPUT"]; // Define hoverable elements

      const isHoverElement =
        elemBelow !== null && hoverableElements.includes(elemBelow.tagName);

      setIsHovering(isHoverElement);
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

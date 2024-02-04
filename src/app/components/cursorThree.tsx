"use client";

import { useRef, useState, useEffect } from "react";

const CursorThree = () => {
  // Specify the type for requestRef to be a number, initializing with null and asserting it as a number because requestAnimationFrame returns a number.
  const requestRef = useRef<number | null>(null);
  const cursorPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Explicitly type the parameter 'e' as MouseEvent
  const moveCursor = (e: MouseEvent) => {
    cursorPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const followCursor = () => {
    const { x, y } = cursorPosRef.current;
    setCursorPos((prevPos) => {
      const dx = x - prevPos.x;
      const dy = y - prevPos.y;
      // Adjust the multiplier for speed/elasticity
      return {
        x: prevPos.x + dx * 0.1,
        y: prevPos.y + dy * 0.1,
      };
    });

    requestRef.current = requestAnimationFrame(followCursor);
  };

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);
    requestRef.current = requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      className="cursor-ring"
      style={{
        position: "fixed",
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
        width: "35px", // Ring size
        height: "35px",
        borderRadius: "50%",
        border: "2px solid white", // Ring appearance
        transform: "translate(-50%, -50%)", // Centers the ring on the cursor
        pointerEvents: "none", // Ensures the cursor doesn't interfere with other elements
        mixBlendMode: "difference",
      }}
    />
  );
};

export default CursorThree;

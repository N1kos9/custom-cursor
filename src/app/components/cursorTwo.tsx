"use client";

import { useState, useEffect, useRef } from "react";

const CursorTwo = () => {
  const requestRef = useRef<number | null>(null);
  const cursorDotPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const moveCursor = (e: MouseEvent) => {
    cursorDotPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const followCursor = () => {
    const { x, y } = cursorDotPosRef.current;
    // Use type assertion to HTMLElement
    const dotEl = document.querySelector(".cursor-dot") as HTMLElement;
    if (dotEl) {
      dotEl.style.transform = `translate(${x}px, ${y}px)`;
    }
    // Smoothly update the cursor outline position.
    setCursorOutlinePos((prevPos) => {
      const dx = x - prevPos.x;
      const dy = y - prevPos.y;
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
    <>
      <div
        className="cursor-dot"
        style={{
          position: "fixed",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
      <div
        className="cursor-outline"
        style={{
          position: "fixed",
          left: `${cursorOutlinePos.x}px`,
          top: `${cursorOutlinePos.y}px`,
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "2px solid white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};

export default CursorTwo;

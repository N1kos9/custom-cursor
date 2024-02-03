"use client";

import { useState, useEffect, useRef } from "react";

const CursorTwo = () => {
  const requestRef = useRef();
  const cursorDotPosRef = useRef({ x: 0, y: 0 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: 0, y: 0 });

  const moveCursor = (e) => {
    cursorDotPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const followCursor = () => {
    const { x, y } = cursorDotPosRef.current;
    // Update cursor-outline position directly to avoid re-rendering
    const dotEl = document.querySelector(".cursor-dot");
    if (dotEl) {
      dotEl.style.transform = `translate(${x}px, ${y}px)`;
    }
    // Smoothly update the cursor outline position
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
      if (requestRef.current) {
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
        }}
      />
      <div
        className="cursor-outline"
        style={{
          position: "fixed",
          left: cursorOutlinePos.x,
          top: cursorOutlinePos.y,
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          border: "1px solid white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CursorTwo;

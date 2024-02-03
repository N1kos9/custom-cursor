"use client";

import { useRef, useState, useEffect } from "react";

const CursorThree = () => {
  const requestRef = useRef();
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const moveCursor = (e) => {
    cursorPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const followCursor = () => {
    const { x, y } = cursorPosRef.current;
    setCursorPos((prevPos) => {
      const dx = x - prevPos.x;
      const dy = y - prevPos.y;
      return {
        x: prevPos.x + dx * 0.1, // Adjust the multiplier for speed/elasticity
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
    <div
      className="cursor-ring"
      style={{
        position: "fixed",
        left: cursorPos.x,
        top: cursorPos.y,
        width: "35px", // Ring size
        height: "35px",
        borderRadius: "50%",
        border: "2px solid white", // Ring appearance
        transform: "translate(-50%, -50%)", // Centers the ring on the cursor
        pointerEvents: "none", // Ensures the cursor doesn't interfere with other elements
      }}
    />
  );
};
export default CursorThree;

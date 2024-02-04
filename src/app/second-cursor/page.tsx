import React from "react";
import CursorTwo from "../components/cursorTwo";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="second-page">
        <CursorTwo />
        <div className="p-8">
          <Link href="/" className="text-white p-6">
            Back
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-44 p-24 text-white cursor-none">
          <h1 className="text-4xl">Second sample</h1>
          <button className="text-2xl rounded-lg border p-4 mt-10">
            Hover me
          </button>
        </div>
      </div>
    </>
  );
};

export default page;

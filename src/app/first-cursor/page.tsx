import React from "react";
import CursorOne from "../components/cursorOne";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="first-page">
        <CursorOne />
        <div className="p-8">
          <Link href="/" className="text-white p-6">
            Back
          </Link>
        </div>
        <div className="flex mt-44 flex-col items-center justify-center p-24 text-white cursor-none">
          <h1 className="text-4xl">First sample</h1>
          <button className="text-2xl rounded-lg border p-4 mt-10">
            Hover me
          </button>
        </div>
      </div>
    </>
  );
};

export default page;

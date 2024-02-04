import React from "react";
import CursorThree from "../components/cursorThree";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="third-page">
        <CursorThree />
        <div className="p-8">
          <Link href="/" className="text-white p-6">
            Back
          </Link>
        </div>
        <div className="flex mt-44 flex-col items-center justify-center p-24 text-white cursor-none">
          <h1 className="text-4xl">Third sample</h1>
          <button className="text-2xl rounded-lg border p-4 mt-10 hover:bg-white hover:text-black duration-300">
            Hover me
          </button>
        </div>
      </div>
    </>
  );
};

export default page;

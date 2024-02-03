"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white">
        <h1 className="text-4xl font-bold">
          Experiment a few custom cursor models made so far!
        </h1>
        <div className="flex flex-row p-6 gap-6">
          <Link
            href="/first-cursor"
            className="border border-white rounded-lg p-4 hover:bg-white hover:text-black duration-300"
          >
            Cursor One
          </Link>
          <Link
            href="/second-cursor"
            className="border border-white rounded-lg p-4 hover:bg-white hover:text-black duration-300"
          >
            Cursor Two
          </Link>
          <Link
            href="/third-cursor"
            className="border border-white rounded-lg p-4 hover:bg-white hover:text-black duration-300"
          >
            Cursor Three
          </Link>
        </div>
      </main>
    </>
  );
}

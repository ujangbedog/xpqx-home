"use client";

import { useEffect, useState } from "react";

const typingSpeed = 100;
const firstText = "Hello World!";
const secondText = "hi, i'm ilham alfath.";

export default function Home() {
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < firstText.length) {
        setFirstLine(firstText.slice(0, currentIndex + 1));
      } else if (currentIndex < firstText.length + secondText.length) {
        setSecondLine(secondText.slice(0, currentIndex + 1 - firstText.length));
      } else {
        clearInterval(typingInterval);
      }
      currentIndex++;
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono">
      <div className="text-4xl font-bold">
        <div>{firstLine}</div>
        <div>
          {secondLine}
          {secondLine.length === secondText.length && (
            <span className="animate-blink">|</span>
          )}
        </div>
      </div>
    </main>
  );
}

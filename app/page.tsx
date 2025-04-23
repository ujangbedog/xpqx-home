"use client";

import { useEffect, useState, Suspense, JSX } from "react";
import dynamic from "next/dynamic";

const FetchIp = dynamic(() => import("./lib/FetchIp"), { ssr: false });

const typingSpeed = 50;

const commandLines = [
  { command: "whoami", output: "ilham" },
  { command: "pwd", output: "/home/ilham" },
  {
    command: "ls -la",
    output:
      "total 12\ndrwxr-xr-x 2 ilham ilham 4096 Apr 23 10:00 .\ndrwxr-xr-x 3 root  root  4096 Apr 23 09:58 ..\n-rw-r--r-- 1 ilham ilham   42 Apr 23 10:00 readme.md",
  },
  {
    command: "cat readme.md",
    output: "Hi, I'm Ilham Alfath. Welcome to my terminal portfolio!",
  },
  {
    command: "sudo apt update",
    output:
      "Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done",
  },
  {
    command: "curl ifconfig.me",
    output: "", // IP Address
  },
  {
    command: "echo \"Type 'help' to get started.\"",
    output: "Type 'help' to get started.",
  },
];

export default function Home() {
  const [lines, setLines] = useState<JSX.Element[]>([]);
  const [typingCommand, setTypingCommand] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ipAddress, setIpAddress] = useState<string>("");

  useEffect(() => {
    if (!ipAddress || currentIndex >= commandLines.length) return;

    const { command, output } = commandLines[currentIndex];
    const commandToType = command;
    const outputToShow = command === "curl ifconfig.me" ? ipAddress : output;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < commandToType.length) {
        setTypingCommand(commandToType.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setLines((prev) => [
          ...prev,
          <div key={`cmd-${currentIndex}`}>
            <span className="font-bold">root@{ipAddress}:~$</span>{" "}
            {commandToType}
          </div>,
          ...(outputToShow
            ? outputToShow
                .split("\n")
                .map((line, i) => (
                  <div key={`out-${currentIndex}-${i}`}>{line}</div>
                ))
            : []),
        ]);
        setTypingCommand("");
        setCurrentIndex((prev) => prev + 1);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentIndex, ipAddress]);

  return (
    <main className="flex items-start justify-start min-h-screen bg-black text-white font-mono overflow-hidden p-4 sm:p-6">
      <Suspense fallback={<div className="text-white">Loading IP...</div>}>
        <FetchIp onFetch={setIpAddress} />
      </Suspense>

      {ipAddress && (
        <div className="w-full max-w-full whitespace-pre-wrap break-words text-[3vw] sm:text-[2vw] md:text-base transition-all duration-300 ease-in-out">
          {lines}
          {currentIndex < commandLines.length ? (
            <div>
              <span className="font-bold">root@{ipAddress}:~$</span>{" "}
              {typingCommand}
              <span className="animate-blink">|</span>
            </div>
          ) : (
            <div>
              <span className="font-bold">root@{ipAddress}:~$</span>{" "}
              <span className="animate-blink">|</span>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

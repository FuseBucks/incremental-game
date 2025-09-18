// read commit message for more context on the structuring

"use client";
import React, { useState } from "react";
import { useButton } from "../hooks/buttonHook";

// ANG BADING NG TYPESCRIPT NEED PA NG MGA GANITO WTFF!!!!
type MainWindowProps = {
  onAddApp: (app: { id: string; title: string }) => void;
};

export function MainWindow({ onAddApp }: MainWindowProps) {
  // use custom hook to manage button states, para malinis
  const {
    virusCount,
    dataCount,
    virusCost,
    canBuyVirus,
    handleDataClick,
    handleVirusClick,
    serverExist,
    serverCost,
    canBuyServer,
    handleServerClick,
  } = useButton();

  const [windows, setWindows] = useState([
    { id: "resources", title: "Resources", x: 160, y: 40, w: 260, h: 110 },
    { id: "virus", title: "Virus", x: 600, y: 420, w: 360, h: 180 },
    { id: "data-center", title: "Data Center", x: 400, y: 300, w: 400, h: 300 },
    {
      id: "Antivirus Software",
      title: "Antivirus Software",
      x: 1100,
      y: 50,
      w: 400,
      h: 150,
    },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  function handleMouseDown(id: string, e: React.MouseEvent) {
    setDraggingId(id);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }

  function AntiVirusProgressBar({ progress }: { progress: number }) {
    return (
      <div
        className="rounded border border-blue-700 bg-[#e9e9e9] p-1 shadow-inner"
        style={{
          width: 220,
          height: 22,
          boxShadow: "inset 1px 1px 2px #fff, inset -1px -1px 2px #b5b5b5",
        }}
      >
        <div
          className="h-full rounded"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #3a9cff 0%, #7fd7ff 100%)",
            boxShadow: "inset 0 1px 2px #fff, 0 1px 2px #1e90ff",
            transition: "width 0.3s",
          }}
        />
      </div>
    );
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!draggingId) return;
    const newX = e.clientX - lastMouse.x;
    const newY = e.clientY - lastMouse.y;

    setWindows((windowsArray) =>
      windowsArray.map((window) =>
        window.id === draggingId
          ? { ...window, x: window.x + newX, y: window.y + newY }
          : window,
      ),
    );

    setLastMouse({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp() {
    setDraggingId(null);
  }

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="h-screen w-screen overflow-hidden"
        style={{ position: "relative", width: "100vw", height: "100vh" }}
      >
        {windows
          .filter((w) => w.id !== "data-center" || serverExist) // filter data-center window if no server bought
          .map((w) => (
            <div
              key={w.id}
              className="tab overflow-hidden"
              style={{
                position: "absolute",
                top: w.y,
                left: w.x,
                cursor: draggingId === w.id ? "grabbing" : "grab",
              }}
              onMouseDown={(e) => handleMouseDown(w.id, e)}
            >
              <div className="font-sans">{w.title}</div>
              <div
                className="tab-internal pointer-events-auto cursor-auto"
                style={{ width: w.w, height: w.h }}
                onMouseDown={(e) => {
                  // Fix to not make inner div draggable and not highlight text when you drag things.
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {w.id === "resources" && (
                  <div className="m-2">
                    <p>Virus: {virusCount}</p>
                    <p>Data: {dataCount}</p>
                  </div>
                )}

                {w.id === "Antivirus Software" && (
                  <div className="m-2 flex flex-col gap-4">
                    <div className="flex justify-center">
                      <AntiVirusProgressBar progress={virusCount % 100} />
                    </div>
                    <div>
                      <p>Antivirus Software is under development.</p>
                    </div>
                  </div>
                )}

                {w.id === "virus" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        handleServerClick();
                        onAddApp({ id: "data-center", title: "Data Center" });
                      }}
                      // disabled={serverExist}
                      className={`group relative ${serverExist ? "hidden" : ""} ${!canBuyServer ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      Server
                      <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Cost: {serverCost} Data
                      </span>
                    </button>
                    <button onClick={handleDataClick}>Data</button>
                    <button
                      onClick={handleVirusClick}
                      disabled={!canBuyVirus}
                      className={`group relative ${
                        !canBuyVirus ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      Virus
                      <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Cost: {virusCost} Data
                      </span>
                    </button>
                  </div>
                )}
                {w.id === "data-center" && (
                  <div className={`${!serverExist ? "hidden" : ""}`}>
                    <button
                      onClick={handleServerClick}
                      className={`group relative ${!serverExist ? "hidden" : ""} ${!canBuyServer ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      Server
                      <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Cost: {serverCost} Data
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

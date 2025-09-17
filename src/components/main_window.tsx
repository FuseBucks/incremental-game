// read commit message for more context on the structuring

"use client";
import React, { useState } from "react";
import { useButton } from "../hooks/buttonHook";

export function MainWindow() {
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
    { id: "resources", title: "Resources", x: 200, y: 80, w: 260, h: 110 },
    { id: "virus", title: "Virus (C:)", x: 600, y: 120, w: 360, h: 180 },
    { id: "data-center", title: "Data Center", x: 400, y: 300, w: 400, h: 300 },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  function handleMouseDown(id: string, e: React.MouseEvent) {
    setDraggingId(id);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!draggingId) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;

    setWindows((ws) =>
      ws.map((w) =>
        w.id === draggingId ? { ...w, x: w.x + dx, y: w.y + dy } : w,
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
        style={{ position: "relative", width: "100vw", height: "100vh" }}
      >
        {windows
          .filter((w) => w.id !== "data-center" || serverExist) // filter data-center window if no server bought
          .map((w) => (
            <div
              key={w.id}
              className="tab"
              style={{
                position: "absolute",
                top: w.y,
                left: w.x,
                cursor: draggingId === w.id ? "grabbing" : "grab",
              }}
              onMouseDown={(e) => handleMouseDown(w.id, e)}
            >
              <div className="font-sans">{w.title}</div>
              <div className="tab-internal" style={{ width: w.w, height: w.h }}>
                {w.id === "resources" && (
                  <div className="m-2">
                    <p>Virus: {virusCount}</p>
                    <p>Data: {dataCount}</p>
                  </div>
                )}
                {w.id === "virus" && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleServerClick}
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

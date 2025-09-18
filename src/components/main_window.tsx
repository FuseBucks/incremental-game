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
    showServerUpgrades,
  } = useButton();

  const [windows, setWindows] = useState([
    { id: "resources", title: "Resources", x: 200, y: 80, w: 260, h: 110 },
    { id: "virus", title: "Virus (C:)", x: 600, y: 120, w: 360, h: 180 },
    { id: "data-center", title: "Data Center", x: 400, y: 300, w: 400, h: 400 },
    {
      id: "server-upgrades",
      title: "Server Upgrades",
      x: 1000,
      y: 300,
      w: 400,
      h: 300,
    },
    {
      id: "Antivirus Software",
      title: "Antivirus Software",
      x: 1500,
      y: 50,
      w: 400,
      h: 150,
    },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  function handleMouseDown(id: string, e: React.MouseEvent) {
    if (id === "server-upgrades") return; // dont drag server upgrades window

    setDraggingId(id);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }

  function AntiVirusProgressBar({ progress }: { progress: number }) {
    const segments = 20;
    const filled = Math.round((progress / 100) * segments);

    return (
      <div
        className="flex items-center rounded border border-blue-700 bg-[#e9e9e9] p-1 shadow-inner"
        style={{
          width: 300,
          height: 22,
          boxShadow: "inset 1px 1px 2px #fff, inset -1px -1px 2px #b5b5b5",
          overflow: "hidden",
        }}
      >
        <div className="flex h-full w-full gap-[2px]">
          {Array.from({ length: segments }).map((_, i) =>
            i < filled ? (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "100%",
                  borderRadius: 2,
                  background:
                    "linear-gradient(180deg, #b6ff8e 0%, #4ec601 100%)",
                  border: "1px solid #8fd16a",
                  boxShadow: "0 1px 2px #fff",
                  transition: "background 0.3s",
                }}
              />
            ) : (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "100%",
                  borderRadius: 2,
                  background: "transparent",
                  border: "1px solid transparent",
                }}
              />
            ),
          )}
        </div>
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
        style={{ position: "relative", width: "100vw", height: "100vh" }}
      >
        {windows
          // filter server components if no server bought
          .filter((w) => w.id !== "data-center" || serverExist)
          .filter(
            (w) =>
              w.id !== "server-upgrades" || (serverExist && showServerUpgrades),
          )
          .map((w) => {
            // place server-upgrades beside data-center when opened
            const dataCenterWindow = windows.find(
              (window) => window.id === "data-center",
            );
            const windowProps =
              w.id === "server-upgrades" && dataCenterWindow
                ? {
                    ...w,
                    x: dataCenterWindow.x + dataCenterWindow.w + 20,
                    y: dataCenterWindow.y,
                  }
                : w;

            return (
              <div
                key={w.id}
                className="tab"
                style={{
                  position: "absolute",
                  top: windowProps.y,
                  left: windowProps.x,
                  cursor:
                    w.id === "server-upgrades"
                      ? "default"
                      : draggingId === w.id
                        ? "grabbing"
                        : "grab",
                }}
                onMouseDown={(e) => handleMouseDown(w.id, e)}
              >
                <div className="font-sans">{w.title}</div>
                <div
                  className={`tab-internal pointer-events-auto cursor-auto ${
                    w.id === "data-center" ? "bg-amber-400" : ""
                  }`}
                  style={{ width: windowProps.w, height: windowProps.h }}
                  onMouseDown={(e) => {
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
                        <p className="tahoma text-[12px]">
                          Antivirus Software is under development.
                        </p>
                      </div>
                    </div>
                  )}

                  {w.id === "virus" && (
                    <div className="flex gap-4">
                      <button
                        onClick={handleServerClick}
                        // disabled={serverExist}
                        className={`group relative ${
                          serverExist ? "hidden" : ""
                        } ${
                          !canBuyServer ? "cursor-not-allowed opacity-50" : ""
                        }`}
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
                    <div className="h-full w-full p-5">
                      <div className="mb-4 rounded text-center">
                        <div className="font-semibold text-red-600">
                          aLpha-01
                        </div>
                      </div>

                      <div className="mb-4 h-50 rounded bg-blue-300 p-2">
                        server asset will be placed here
                      </div>

                      <div className="mb-4 rounded bg-green-400 p-2 text-center">
                        test
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={handleServerClick}
                          className={`rounded border px-4 py-2 transition-colors ${
                            showServerUpgrades
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-white hover:bg-gray-100"
                          } group relative`}
                        >
                          {showServerUpgrades
                            ? "Close Upgrades"
                            : "Modify Server"}
                        </button>
                      </div>
                    </div>
                  )}

                  {w.id === "server-upgrades" && (
                    <div className="h-full w-full p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Server Upgrades</h2>
                      </div>

                      <div className="space-y-3">test</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

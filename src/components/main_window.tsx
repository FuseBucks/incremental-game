// read commit message for more context on the structuring

"use client";
import React, { useState, useEffect } from "react";
import { useButton } from "../hooks/button_hook";
import { SkillTree } from "./skill_tree";
import { DataCenter, ServerUpgrades } from "./data_center";
import { AntivirusWindow, AntivirusWarning } from "./antivirus";

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
    isSkillTreeOpen,
    handleDataClick,
    handleVirusClick,
    serverExist,
    serverCost,
    canBuyServer,
    handleServerClick,
    showServerUpgrades,
  } = useButton();

  const [windows, setWindows] = useState([
    { id: "resources", title: "Resources", x: 160, y: 40, w: 260, h: 110 },
    { id: "virus", title: "Virus", x: 750, y: 320, w: 360, h: 180 },
    { id: "data-center", title: "Data Center", x: 400, y: 300, w: 400, h: 400 },
    {
      id: "server-upgrades",
      title: "Server Upgrades",
      x: 1000,
      y: 300,
      w: 400,
      h: 300,
    },
    // REMOVE Antivirus Software from initial state!
  ]);
  const [warningShown, setWarningShown] = useState(false);

  // Show warning and antivirus windows only once when virusCount >= 10
  useEffect(() => {
    if (virusCount >= 10 && !warningShown) {
      setWindows((prev) => [
        ...prev,
        {
          id: "warning-virus",
          title: "Critical Warning!",
          x: 800,
          y: 300,
          w: 400,
          h: 200,
        },
        {
          id: "Antivirus Software",
          title: "Antivirus Software",
          x: 1100,
          y: 50,
          w: 400,
          h: 150,
        },
      ]);
      setWarningShown(true);
    }
  }, [virusCount, warningShown]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  function handleMouseDown(id: string, e: React.MouseEvent) {
    if (id === "server-upgrades") return; // dont drag server upgrades window

    setDraggingId(id);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.preventDefault();
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
                className="tab overflow-hidden"
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
                  {w.id === "warning-virus" && (
                    <AntivirusWarning
                      onClose={() =>
                        setWindows((prev) =>
                          prev.filter((win) => win.id !== "warning-virus"),
                        )
                      }
                    />
                  )}

                  {w.id === "Antivirus Software" && (
                    <AntivirusWindow
                      onClose={() =>
                        setWindows((prev) =>
                          prev.filter((win) => win.id !== "Antivirus Software"),
                        )
                      }
                    />
                  )}

                  {w.id === "virus" && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          handleServerClick();
                          onAddApp({ id: "data-center", title: "Data Center" });
                        }}
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
                      <DataCenter
                        handleServerClick={handleServerClick}
                        showServerUpgrades={showServerUpgrades}
                      />
                    </div>
                  )}

                  {w.id === "server-upgrades" && (
                    <div className="h-full w-full p-4">
                      <ServerUpgrades />
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

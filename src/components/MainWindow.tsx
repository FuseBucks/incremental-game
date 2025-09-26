// read commit message for more context on the structuring

"use client";
import React, { useState, useEffect } from "react";
import { useButton } from "../hooks/ButtonHook";
import { SkillTree } from "./SkillTree";
import { DataCenter, ServerUpgrades } from "./DataCenter";
import { AntivirusWindow, AntivirusWarning } from "./AntiVirus";
import { GameWindow } from "../types/windows";
import { Tier } from "./Tier";

type MainWindowProps = {
  onAddApp: (app: { id: string; title: string }) => void;
  windows: GameWindow[];
  setWindows: React.Dispatch<React.SetStateAction<GameWindow[]>>;
};

export function MainWindow({ onAddApp, windows, setWindows }: MainWindowProps) {
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
    setMultiplierValue,
    dataMultiplier,
    virusMultiplier,
    setDataCount,
    setVirusCount,
    packetCount,
    upgVirusCost,
    upgDataCost,
    upgPacketCost,
    handleServerUpgrade,
    upgPacketLevel,
    upgDataLevel,
    upgVirusLevel,
  } = useButton();
  // REMOVE Antivirus Software from initial state!
  const [warningShown, setWarningShown] = useState(false);
  const [tierShown, setTierShown] = useState(false);

  const [antivirusProgress, setAntivirusProgress] = useState(0);
  const [antivirusActive, setAntivirusActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Show warning and antivirus windows only once when virusCount >= 10
  useEffect(() => {
    if (virusCount >= 10 && !warningShown) {
      setAntivirusActive(true);
      setWindows((prev) => {
        const addIfMissing = (id: string, win: GameWindow) =>
          prev.some((p) => p.id === id) ? prev : [...prev, win];

        let updated = prev;
        if (!prev.some((w) => w.id === "warning-virus")) {
          updated = [
            ...updated,
            {
              id: "warning-virus",
              title: "Critical Warning!",
              x: 800,
              y: 300,
              w: 400,
              h: 200,
              open: true,
            },
          ];
        }
        if (!updated.some((w) => w.id === "Antivirus Software")) {
          updated = [
            ...updated,
            {
              id: "Antivirus Software",
              title: "Antivirus Software",
              x: 1100,
              y: 50,
              w: 400,
              h: 150,
              open: true,
            },
          ];
          onAddApp({ id: "Antivirus Software", title: "Antivirus Software" });
        }
        return updated;
      });
      setWarningShown(true);
    }
  }, [virusCount, warningShown, setWindows]);

  // Antivirus progress effect
  useEffect(() => {
    if (!antivirusActive) return;
    if (antivirusProgress >= 100) return;

    // need balancing. draft also because its affected by skill trees and tiers
    const interval = setInterval(() => {
      setAntivirusProgress((prev) => Math.min(100, prev + 1)); 
      console.log("Antivirus progress:", antivirusProgress);
      setVirusCount((prev) => Math.max(0, prev - 1)); 
      console.log("Virus count:", virusCount);
    }, 10000);

    return () => clearInterval(interval);
  }, [antivirusActive, antivirusProgress, setVirusCount]);

  // Alert when antivirus completes
  useEffect(() => {
    if (antivirusProgress >= 100) {
      setAntivirusActive(false);
      setGameOver(true);
      setVirusCount(0);
      setDataCount(0);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === "Antivirus Software"
            ? { ...w, open: true }
            : { ...w, open: false },
        ),
      );
    }
  }, [antivirusProgress, setVirusCount, setDataCount, setWindows]);

  useEffect(() => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === "server-upgrades" ? { ...w, open: showServerUpgrades } : w,
      ),
    );
  }, [showServerUpgrades, setWindows]);

  // Show tier window when data >= 50 and virus >= 30
  useEffect(() => {
    if (dataCount >= 1 && virusCount >= 0 && !tierShown) {
      setWindows((prev) =>
        prev.map((w) => (w.id === "tier" ? { ...w, open: true } : w)),
      );
      onAddApp({ id: "tier", title: "Tier" });
      setTierShown(true);
    }
  }, [dataCount, virusCount, tierShown, setWindows, onAddApp]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  function handleMouseDown(id: string, e: React.MouseEvent) {
    if (id === "server-upgrades") return;
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
              className={`tab overflow-hidden ${!w.open ? "hidden" : ""}`}
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
                    <p className={`${serverExist ? "" : "hidden"}`}>
                      Packets: {packetCount}
                    </p>
                  </div>
                )}
                {w.id === "warning-virus" && (
                  <AntivirusWarning
                    onClose={() =>
                      setWindows((prev) =>
                        prev.map((win) =>
                          win.id === "warning-virus"
                            ? { ...win, open: false }
                            : win,
                        ),
                      )
                    }
                  />
                )}
                {w.id === "Antivirus Software" && (
                  <AntivirusWindow
                    progress={antivirusProgress}
                    onClose={() =>
                      setWindows((prev) =>
                        prev.map((win) =>
                          win.id === "Antivirus Software"
                            ? { ...win, open: false }
                            : win,
                        ),
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
                    <ServerUpgrades
                      packetCount={packetCount}
                      upgVirusCost={upgVirusCost}
                      upgDataCost={upgDataCost}
                      upgPacketCost={upgPacketCost}
                      upgVirusLevel={upgVirusLevel}
                      upgDataLevel={upgDataLevel}
                      upgPacketLevel={upgPacketLevel}
                      handleServerUpgrade={handleServerUpgrade}
                    />
                  </div>
                )}
                {w.id === "tier" && (
                  <div className="h-full w-full p-4">
                    <Tier
                      virusCount={virusCount}
                      dataCount={dataCount}
                      dataMultiplier={dataMultiplier}
                      virusMultiplier={virusMultiplier}
                      setMultiplierValue={setMultiplierValue}
                      setDataCount={setDataCount}
                      setVirusCount={setVirusCount}
                    />
                  </div>
                )}

                {/* Game Over Modal */}
                {gameOver && (
                  <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="rounded bg-white p-8 text-center shadow-lg">
                      <h2 className="mb-4 text-2xl font-bold text-red-700">
                        Antivirus Complete!
                      </h2>
                      <p className="mb-4">
                        ERVIRUS has been removed. You have lost the game.
                      </p>
                      <button
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        onClick={() => window.location.reload()}
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

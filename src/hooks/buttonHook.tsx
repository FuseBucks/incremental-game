// hook folder will contain logic to manage features where client interaction is needed  (e.g. useState, useEffect, etc)

"use client";
import { useState, useEffect, useMemo } from "react";

export function useButton() {
  const [dataCount, setDataCount] = useState(0);
  const [virusCount, setVirusCount] = useState(0);
  const [virusCost, setVirusCost] = useState(10);
  const [multiplier, setMultiplier] = useState(1);

  const canBuyVirus = useMemo(
    () => dataCount >= virusCost,
    [dataCount, virusCost],
  );

  // server states
  const [serverExist, setServerExist] = useState(false);
  const [serverCount, setServerCount] = useState(0);
  const [showServerUpgrades, setShowServerUpgrades] = useState(false);

  const [serverCost, setServerCost] = useState(10); //draft init cost, babaan niyo nalang kung gusto niyo itest
  const canBuyServer = useMemo(
    () => dataCount >= serverCost,
    [dataCount, serverCost],
  );

  const handleDataClick = () => {
    setDataCount((prevData) => prevData + 1);
  };

  const handleVirusClick = () => {
    // Store current cost to avoid stale closure issues
    const currentCost = virusCost;

    if (dataCount >= currentCost) {
      setVirusCount((prevVirus) => prevVirus + 1);
      setDataCount((prevData) => prevData - currentCost);
      setVirusCost((prevCost) => Math.floor(prevCost * 1.5));
    }
  };

  const setMultiplierValue = (newMultiplier: number) => {
    setMultiplier(newMultiplier);
  };

  // Auto-increment data relevant to the number of viruses owned multiplied by multiplier
  useEffect(() => {
    if (virusCount > 0) {
      const interval = setInterval(() => {
        setDataCount((prevData) => prevData + virusCount * multiplier);
      }, 1000); // Increase data every 1 second

      return () => clearInterval(interval);
    }
  }, [virusCount, multiplier]);

  // draft : same config with virus auto-increment
  useEffect(() => {
    if (serverCount > 0) {
      const interval = setInterval(() => {
        setVirusCount((prev) => prev + serverCount * multiplier);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [serverCount, multiplier]);

  const handleServerClick = () => {
    const currentCost = serverCost;

    if (serverExist) {
      setShowServerUpgrades(!showServerUpgrades);
      //todo server upgrades and stuff
    }

    if (dataCount >= currentCost) {
      setServerExist(true);
      setServerCount((prev) => prev + 1);
      setDataCount((prev) => prev - currentCost);
    }
    setServerCost((prev) => Math.floor(prev * 100));
  };

  return {
    virusCount,
    dataCount,
    multiplier,
    virusCost,
    canBuyVirus,
    handleDataClick,
    handleVirusClick,
    setMultiplierValue,
    handleServerClick,
    serverCost,
    canBuyServer,
    serverExist,
    serverCount,
    showServerUpgrades,
  };
}

// hook folder will contain logic to manage features where client interaction is needed  (e.g. useState, useEffect, etc)

"use client";
import { useState, useEffect, useMemo } from "react";
import type { GameWindow } from "../types/windows";

export function useButton() {
  const [dataCount, setDataCount] = useState(0);
  const [virusCount, setVirusCount] = useState(0);
  const [virusCost, setVirusCost] = useState(10);
  const [dataMultiplier, setDataMultiplier] = useState(1);
  const [virusMultiplier, setVirusMultiplier] = useState(1);

  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState(false);

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
    setDataMultiplier(newMultiplier);
    setVirusMultiplier(newMultiplier);
  };

  const handleSkillTreeClick = () => {
    setIsSkillTreeOpen(true);
  };

  const closeSkillTree = () => {
    setIsSkillTreeOpen(false);
  };

  // Combined auto-increment for both data and virus generation
  useEffect(() => {
    const hasAnyGeneration = virusCount > 0 || serverCount > 0;
    
    if (hasAnyGeneration) {
      const interval = setInterval(() => {
        // Update both data and virus in a single interval to avoid timing conflicts
        if (virusCount > 0) {
          setDataCount((prevData) => prevData + virusCount * dataMultiplier);
        }
        if (serverCount > 0) {
          setVirusCount((prevVirus) => prevVirus + serverCount * virusMultiplier);
        }
      }, 1000); // Increase every 1 second

      return () => clearInterval(interval);
    }
  }, [virusCount, dataMultiplier, serverCount, virusMultiplier]);

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
    dataMultiplier,
    virusMultiplier,
    virusCost,
    canBuyVirus,
    isSkillTreeOpen,
    handleDataClick,
    handleVirusClick,
    handleSkillTreeClick,
    closeSkillTree,
    setMultiplierValue,
    handleServerClick,
    serverCost,
    canBuyServer,
    serverExist,
    serverCount,
    showServerUpgrades,
  };
}

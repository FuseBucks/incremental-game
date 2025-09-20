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
  const [packetCount, setPacketCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const serverCost = 10;
  const canBuyServer = useMemo(
    () => dataCount >= serverCost,
    [dataCount, serverCost],
  );

  // server upgrade states
  const [showServerUpgrades, setShowServerUpgrades] = useState(false);

  // cost
  const [upgVirusCost, setUpgVirusCost] = useState(15);
  const [upgDataCost, setUpgDataCost] = useState(15);
  const [upgPacketCost, setUpgPacketCost] = useState(15);
  // levels
  const [upgVirusLevel, setUpgVirusLevel] = useState(0);
  const [upgDataLevel, setUpgDataLevel] = useState(0);
  const [upgPacketLevel, setUpgPacketLevel] = useState(0);
  // multipliers
  const [upgVirusMultiplier, setUpgVirusMultiplier] = useState(1);
  const [upgDataMultiplier, setUpgDataMultiplier] = useState(1);
  const [upgPacketMultiplier, setUpgPacketMultiplier] = useState(1);

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

  // nde ata nagamit to?
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
    const hasAnyGeneration = virusCount > 0 || serverExist;

    if (hasAnyGeneration) {
      const interval = setInterval(() => {
        // Update both data and virus in a single interval to avoid timing conflicts
        if (virusCount > 0) {
          setDataCount((prev) => {
            const newValue =
              prev + virusCount * dataMultiplier * upgDataMultiplier;
            return newValue;
          });
        }

        if (serverExist) {
          setPacketCount((prev) => {
            const newValue = prev + 1 * upgPacketMultiplier;
            return newValue;
          });

          // Generate viruses only if virus upgrade is bought
          if (upgVirusLevel > 0) {
            setVirusCount((prev) => {
              const newValue = prev + upgVirusMultiplier * virusMultiplier;
              return newValue;
            });
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    virusCount,
    serverExist,
    dataMultiplier,
    upgDataMultiplier,
    upgPacketMultiplier,
    upgVirusMultiplier,
    upgVirusLevel,
    virusMultiplier,
  ]);

  const handleServerClick = () => {
    const currentCost = serverCost;

    if (dataCount >= currentCost && !serverExist) {
      console.log("Server purchased for the first time");
      setServerExist(true);
      setServerCount((prev) => prev + 1);
      setDataCount((prev) => prev - currentCost);
    } else if (serverExist) {
      setShowServerUpgrades((prev) => !prev);
    }
  };

  const handleServerUpgrade = (type: string) => {
    let cost = 0;
    switch (type) {
      case "virus":
        cost = upgVirusCost;
        break;
      case "data":
        cost = upgDataCost;
        break;
      case "packet":
        cost = upgPacketCost;
        break;
      default:
        console.log("invalid key: ", type);
        return;
    }

    if (packetCount < cost) {
      return;
    }

    setPacketCount((prev) => {
      const newValue = prev - cost;
      return newValue;
    });

    switch (type) {
      case "virus":
        console.log("Purchasing virus upgrade");
        setUpgVirusLevel((prev) => prev + 1);
        setUpgVirusCost((prev) => Math.floor(prev * 1.5));
        setUpgVirusMultiplier((prev) => prev + 0.5);
        break;
      case "data":
        console.log("Purchasing data upgrade");
        setUpgDataLevel((prev) => prev + 1);
        setUpgDataCost((prev) => Math.floor(prev * 1.5));
        setUpgDataMultiplier((prev) => prev + 0.5);
        break;
      case "packet":
        console.log("Purchasing packet upgrade");
        setUpgPacketLevel((prev) => prev + 1);
        setUpgPacketCost((prev) => Math.floor(prev * 1.5));
        setUpgPacketMultiplier((prev) => prev + 0.5);
        break;
    }
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
    packetCount,
    upgVirusCost,
    upgDataCost,
    upgPacketCost,
    showServerUpgrades,
    handleServerUpgrade,
    upgVirusLevel,
    upgDataLevel,
    upgPacketLevel,
  };
}

// hook folder will contain logic to manage features where client interaction is needed  (e.g. useState, useEffect, etc)

"use client";
import { useState, useEffect, useMemo } from "react";
import type { GameWindow } from "../types/windows";
import { useSkills } from "./SkillHook";
import { calculateSkillEffects } from "../util/skills";

export function useButton() {
  const [dataCount, setDataCount] = useState(0);
  const [virusCount, setVirusCount] = useState(0);
  const [virusCost, setVirusCost] = useState(10);
  const [dataMultiplier, setDataMultiplier] = useState(1);
  const [virusMultiplier, setVirusMultiplier] = useState(1);

  // Use the skills hook
  const skills = useSkills();
  const { virusGenMultiplier, dataGenMultiplier } = skills.getColumnMultipliers();

  // server states
  const [serverExist, setServerExist] = useState(false);
  const [packetCount, setPacketCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const serverCost = 10;

  // server upgrade states
  const [showServerUpgrades, setShowServerUpgrades] = useState(false);
  const [upgVirusCost, setUpgVirusCost] = useState(15);
  const [upgDataCost, setUpgDataCost] = useState(15);
  const [upgPacketCost, setUpgPacketCost] = useState(15);
  const [upgVirusLevel, setUpgVirusLevel] = useState(0);
  const [upgDataLevel, setUpgDataLevel] = useState(0);
  const [upgPacketLevel, setUpgPacketLevel] = useState(0);
  const [upgVirusMultiplier, setUpgVirusMultiplier] = useState(1);
  const [upgDataMultiplier, setUpgDataMultiplier] = useState(1);
  const [upgPacketMultiplier, setUpgPacketMultiplier] = useState(1);

  // Calculate individual skill effects BEFORE using them
  const skillEffects = useMemo(() => {
    return calculateSkillEffects(
      skills.unlockedSkills,
      virusCount,
      serverExist,
      skills.adaptiveSurveillanceLevel
    );
  }, [skills.unlockedSkills, virusCount, serverExist, skills.adaptiveSurveillanceLevel]);
  
  // Calculate effective costs BEFORE using them
  const effectiveVirusCost = useMemo(() => {
    return Math.floor(virusCost * (1 - skillEffects.virusCostReduction));
  }, [virusCost, skillEffects.virusCostReduction]);

  const canBuyVirus = useMemo(
    () => dataCount >= effectiveVirusCost,
    [dataCount, effectiveVirusCost],
  );

  const canBuyServer = useMemo(
    () => dataCount >= serverCost,
    [dataCount, serverCost],
  );

  // NOW you can define functions that use skillEffects and effectiveVirusCost
  const handleDataClick = () => {
    const clickValue = 1 + skillEffects.dataClickBonus;
    setDataCount((prevData) => prevData + clickValue);
  };

  const handleVirusClick = () => {
    const currentCost = effectiveVirusCost;

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

  // Auto-unlock servers when Creeping Spawn is active
  useEffect(() => {
    if (skillEffects.autoUnlockServers && !serverExist) {
      console.log("Auto-unlocking server due to Creeping Spawn skill");
      setServerExist(true);
      setServerCount(1); // Set to 1 instead of incrementing
      // Don't deduct data cost when unlocked via skill
    }
  }, [skillEffects.autoUnlockServers, serverExist]);

  // Combined auto-increment for both data and virus generation
  useEffect(() => {
    const hasAnyGeneration = virusCount > 0 || serverExist;

    if (hasAnyGeneration) {
      const interval = setInterval(() => {
        // Update both data and virus in a single interval to avoid timing conflicts
        if (virusCount > 0) {
          setDataCount((prev) => {
            const baseGeneration = virusCount * dataMultiplier * upgDataMultiplier;
            const columnMultipliedGeneration = baseGeneration * dataGenMultiplier;
            const skillBonusMultiplier = 1 + skillEffects.dataGenerationBonus;
            const finalGeneration = columnMultipliedGeneration * skillBonusMultiplier;
            
            console.log('=== DATA GENERATION ===');
            console.log('Virus Count:', virusCount);
            console.log('Base Data Multiplier:', dataMultiplier);
            console.log('Upgrade Data Multiplier:', upgDataMultiplier);
            console.log('Column Data Multiplier:', dataGenMultiplier);
            console.log('Skill Bonus Multiplier:', skillBonusMultiplier);
            console.log('Total Data Multiplier:', dataMultiplier * upgDataMultiplier * dataGenMultiplier * skillBonusMultiplier);
            console.log('Data Generation per Second:', finalGeneration);
            console.log('=======================');
            
            return Math.floor(prev + finalGeneration);
          });
        }

        if (serverExist) {
          setPacketCount((prev) => Math.floor(prev + 1 * upgPacketMultiplier));

          if (upgVirusLevel > 0) {
            setVirusCount((prev) => {
              const baseGeneration = 1 * upgVirusMultiplier * virusMultiplier;
              const columnMultipliedGeneration = baseGeneration * virusGenMultiplier;
              const skillBonusMultiplier = 1 + skillEffects.virusGenerationBonus;
              const finalGeneration = columnMultipliedGeneration * skillBonusMultiplier;
              
              console.log('=== VIRUS GENERATION ===');
              console.log('Base Virus Multiplier:', virusMultiplier);
              console.log('Upgrade Virus Multiplier:', upgVirusMultiplier);
              console.log('Column Virus Multiplier:', virusGenMultiplier);
              console.log('Skill Bonus Multiplier:', skillBonusMultiplier);
              console.log('Total Virus Multiplier:', virusMultiplier * upgVirusMultiplier * virusGenMultiplier * skillBonusMultiplier);
              console.log('Virus Generation per Second:', finalGeneration);
              console.log('========================');
              
              return Math.floor(prev + finalGeneration);
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
    virusGenMultiplier,
    dataGenMultiplier,
    skillEffects,
  ]);

  const handleServerClick = () => {
    const currentCost = serverCost;

    if (dataCount >= currentCost && !serverExist) {
      console.log("Server purchased for the first time");
      setServerExist(true);
      setServerCount(1); // Set to 1 instead of incrementing
      setDataCount((prev) => prev - currentCost);
    } else if (serverExist) {
      setShowServerUpgrades((prev) => !prev);
    }
  };

  const handleServerUpgrade = (type: string) => {
    let baseCost = 0;
    switch (type) {
      case "virus":
        baseCost = upgVirusCost;
        break;
      case "data":
        baseCost = upgDataCost;
        break;
      case "packet":
        baseCost = upgPacketCost;
        break;
      default:
        console.log("invalid key: ", type);
        return;
    }

    // Apply skill-based cost reduction
    const effectiveCost = Math.floor(baseCost * (1 - skillEffects.serverUpgradeCostReduction));

    if (packetCount < effectiveCost) {
      return;
    }

    setPacketCount((prev) => prev - effectiveCost);

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
    setDataCount,
    setVirusCount,
    virusCost: effectiveVirusCost,
    canBuyVirus,
    handleDataClick,
    handleVirusClick,
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
    skillEffects,
    // Expose skills functionality
    ...skills,
  };
}

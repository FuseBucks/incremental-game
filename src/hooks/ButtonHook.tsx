// hook folder will contain logic to manage features where client interaction is needed  (e.g. useState, useEffect, etc)

"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import type { GameWindow } from "../types/windows";
//import { useSkills } from "./SkillHook"; BYE BYE
import { calculateSkillEffects } from "../util/skills";

// Accept a shared skills instance and external virus count management
export function useButton(
  SkillHook: ReturnType<typeof import("./SkillHook").useSkills>,
  externalVirusCount: number,
  externalSetVirusCount: React.Dispatch<React.SetStateAction<number>>,
) {
  const [dataCount, setDataCount] = useState(0);

  // Use external virus count/setter
  const virusCount = externalVirusCount;
  const setVirusCount = externalSetVirusCount;

  const [virusCost, setVirusCost] = useState(10);
  const [dataMultiplier, setDataMultiplier] = useState(1);
  const [virusMultiplier, setVirusMultiplier] = useState(1);

  // Use the skills passed in (single source of truth)
  // const skills = useSkills();  // removed
  const { virusGenMultiplier, dataGenMultiplier } =
    SkillHook.getColumnMultipliers();

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

  // Add refs for values that change and are needed in the interval
  const virusCountRef = useRef(virusCount);
  const serverExistRef = useRef(serverExist);
  const unlockedSkillsRef = useRef(SkillHook.unlockedSkills);
  const adaptiveSurveillanceLevelRef = useRef(
    SkillHook.adaptiveSurveillanceLevel,
  );
  const multiplierRefs = useRef({
    dataMultiplier,
    virusMultiplier,
    upgDataMultiplier,
    upgVirusMultiplier,
    upgPacketMultiplier,
    virusGenMultiplier,
    dataGenMultiplier,
    upgVirusLevel,
  });

  // Update refs when values change
  useEffect(() => {
    virusCountRef.current = virusCount;
  }, [virusCount]);
  useEffect(() => {
    serverExistRef.current = serverExist;
  }, [serverExist]);
  useEffect(() => {
    unlockedSkillsRef.current = SkillHook.unlockedSkills;
  }, [SkillHook.unlockedSkills]);
  useEffect(() => {
    adaptiveSurveillanceLevelRef.current = SkillHook.adaptiveSurveillanceLevel;
  }, [SkillHook.adaptiveSurveillanceLevel]);
  useEffect(() => {
    multiplierRefs.current = {
      dataMultiplier,
      virusMultiplier,
      upgDataMultiplier,
      upgVirusMultiplier,
      upgPacketMultiplier,
      virusGenMultiplier,
      dataGenMultiplier,
      upgVirusLevel,
    };
  }, [
    dataMultiplier,
    virusMultiplier,
    upgDataMultiplier,
    upgVirusMultiplier,
    upgPacketMultiplier,
    virusGenMultiplier,
    dataGenMultiplier,
    upgVirusLevel,
  ]);

  // Calculate individual skill effects BEFORE using them
  const skillEffects = useMemo(() => {
    return calculateSkillEffects(
      SkillHook.unlockedSkills,
      virusCount,
      serverExist,
      SkillHook.adaptiveSurveillanceLevel,
    );
  }, [
    SkillHook.unlockedSkills,
    virusCount,
    serverExist,
    SkillHook.adaptiveSurveillanceLevel,
  ]);

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
        // nilagay ko sa labas para lang ma test yung mga values
        // Get fresh values from refs
        const currentVirusCount = virusCountRef.current;
        const currentServerExist = serverExistRef.current;
        const currentUnlockedSkills = unlockedSkillsRef.current;
        const currentAdaptiveSurveillanceLevel =
          adaptiveSurveillanceLevelRef.current;
        const currentMultipliers = multiplierRefs.current;

        // Calculate skill effects with fresh values
        const currentSkillEffects = calculateSkillEffects(
          currentUnlockedSkills,
          currentVirusCount,
          currentServerExist,
          currentAdaptiveSurveillanceLevel,
        );
        console.log(
          "Fresh Data Generation Bonuses:",
          currentSkillEffects.dataGenerationBonus,
        );
        console.log("Current Unlocked Skills:", currentUnlockedSkills);
        console.log("Current Virus Count:", currentVirusCount);
        console.log("Current Server Exist:", currentServerExist);

        // Update virus count first if applicable
        if (currentServerExist && currentMultipliers.upgVirusLevel > 0) {
          setVirusCount((prev) => {
            const baseGeneration =
              1 *
              currentMultipliers.upgVirusMultiplier *
              currentMultipliers.virusMultiplier;
            const columnMultipliedGeneration =
              baseGeneration * currentMultipliers.virusGenMultiplier;
            const skillBonusMultiplier =
              1 + currentSkillEffects.virusGenerationBonus;
            const finalGeneration =
              columnMultipliedGeneration * skillBonusMultiplier;

            console.log("=== VIRUS GENERATION ===");
            console.log(
              "Base Virus Multiplier:",
              currentMultipliers.virusMultiplier,
            );
            console.log(
              "Upgrade Virus Multiplier:",
              currentMultipliers.upgVirusMultiplier,
            );
            console.log(
              "Column Virus Multiplier:",
              currentMultipliers.virusGenMultiplier,
            );
            console.log("Skill Bonus Multiplier:", skillBonusMultiplier);
            console.log(
              "Total Virus Multiplier:",
              currentMultipliers.virusMultiplier *
                currentMultipliers.upgVirusMultiplier *
                currentMultipliers.virusGenMultiplier *
                skillBonusMultiplier,
            );
            console.log("Virus Generation per Second:", finalGeneration);
            console.log("========================");

            const newVirusCount = Math.floor(prev + finalGeneration);
            virusCountRef.current = newVirusCount; // Update ref immediately for data generation
            return newVirusCount;
          });
        }

        // Update data count using the fresh virus count from ref
        if (virusCountRef.current > 0) {
          setDataCount((prev) => {
            const baseGeneration =
              virusCountRef.current *
              currentMultipliers.dataMultiplier *
              currentMultipliers.upgDataMultiplier;
            const columnMultipliedGeneration =
              baseGeneration * currentMultipliers.dataGenMultiplier;
            const skillBonusMultiplier =
              1 + currentSkillEffects.dataGenerationBonus;
            const finalGeneration =
              columnMultipliedGeneration * skillBonusMultiplier;

            console.log("=== DATA GENERATION ===");
            console.log("Virus Count:", virusCountRef.current);
            console.log(
              "Base Data Multiplier:",
              currentMultipliers.dataMultiplier,
            );
            console.log(
              "Upgrade Data Multiplier:",
              currentMultipliers.upgDataMultiplier,
            );
            console.log(
              "Column Data Multiplier:",
              currentMultipliers.dataGenMultiplier,
            );
            console.log("Skill Bonus Multiplier:", skillBonusMultiplier);
            console.log(
              "Total Data Multiplier:",
              currentMultipliers.dataMultiplier *
                currentMultipliers.upgDataMultiplier *
                currentMultipliers.dataGenMultiplier *
                skillBonusMultiplier,
            );
            console.log("Data Generation per Second:", finalGeneration);
            console.log("=======================");

            return Math.floor(prev + finalGeneration);
          });
        }

        // Update packet count
        if (currentServerExist) {
          setPacketCount((prev) =>
            Math.floor(prev + 1 * currentMultipliers.upgPacketMultiplier),
          );
          console.log("spc test:", currentMultipliers.upgPacketMultiplier);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    // Use actual values instead of boolean expressions to prevent multiple intervals
    virusCount,
    serverExist,
    setVirusCount,
  ]);

  // Para ma check kung nabalik ba sa 0. Di  ma access outside interval kasi nasa local kaya gumamit ako useEffect tas pag tinoggle yung mga skills makita mo
  useEffect(() => {
    console.log(
      "Outside Interval - Data Generation Bonus:",
      skillEffects.dataGenerationBonus,
      "Unlocked Skills:",
      SkillHook.unlockedSkills,
    );
  }, [skillEffects.dataGenerationBonus, SkillHook.unlockedSkills]);

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
    const effectiveCost = Math.floor(
      baseCost * (1 - skillEffects.serverUpgradeCostReduction),
    );

    if (packetCount < effectiveCost) {
      return;
    }

    setPacketCount((prev) => prev - effectiveCost);

    switch (type) {
      case "virus":
        console.log("Purchasing virus upgrade");
        setUpgVirusLevel((prev) => prev + 1);
        setUpgVirusCost((prev) => Math.floor(prev * 2.5));
        setUpgVirusMultiplier((prev) => prev * 2);
        console.log("Current Virus Cost:", upgVirusCost);
        console.log("Current Virus Income Multiplier:", upgVirusMultiplier);
        break;
      case "data":
        console.log("Purchasing data upgrade");
        setUpgDataLevel((prev) => prev + 1);
        setUpgDataCost((prev) => Math.floor(prev * 2.5));
        setUpgDataMultiplier((prev) => prev + 0.5);
        console.log("Current Data Cost:", upgDataCost);
        console.log("Current Data Income Multiplier:", upgDataMultiplier);
        break;
      case "packet":
        console.log("Purchasing packet upgrade");
        setUpgPacketLevel((prev) => prev + 1);
        setUpgPacketCost((prev) => Math.floor(prev * 2.5));
        setUpgPacketMultiplier((prev) => prev * 2);
        console.log("Current Packet Cost:", upgPacketCost);
        console.log("Current Packet Income Multiplier:", upgPacketMultiplier);
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

    // server main states
    handleServerClick,
    serverCost,
    canBuyServer,
    serverExist,
    serverCount,
    packetCount,

    // server update
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
    ...SkillHook,
  };
}

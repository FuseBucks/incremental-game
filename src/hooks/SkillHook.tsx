"use client";
import { useState, useEffect, useMemo } from "react";

export interface SkillState {
  creepingSpawn: boolean;
  bandwidthLeech: boolean;
  telemetryBoost: boolean;
  packetFragmentation: boolean;
  backdoorDividend: boolean;
  insideJob: boolean;
  dormantPayload: boolean;
  insiderAccess: boolean;
  silentHarvest: boolean;
  bandwidthOverload: boolean;
  adaptiveSurveillance: boolean;
  dataCompression: boolean;
}

export function useSkills() {
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState(false);
  const [selectedSkillColumn, setSelectedSkillColumn] = useState<string | null>(null);
  const [adaptiveSurveillanceLevel, setAdaptiveSurveillanceLevel] = useState(0);

  // Skill tree state
  const [unlockedSkills, setUnlockedSkills] = useState<SkillState>({
    creepingSpawn: false,
    bandwidthLeech: false,
    telemetryBoost: false,
    packetFragmentation: false,
    backdoorDividend: false,
    insideJob: false,
    dormantPayload: false,
    insiderAccess: false,
    silentHarvest: false,
    bandwidthOverload: false,
    adaptiveSurveillance: false,
    dataCompression: false,
  });

  // Define which skills belong to which column
  const columnSkills = {
    worms: ['creepingSpawn', 'bandwidthLeech', 'telemetryBoost', 'packetFragmentation'],
    trojan: ['backdoorDividend', 'insideJob', 'dormantPayload', 'insiderAccess'],
    spyware: ['silentHarvest', 'bandwidthOverload', 'adaptiveSurveillance', 'dataCompression']
  } as const;

  // Column multipliers based on selected skill tree
  const getColumnMultipliers = () => {
    let virusGenMultiplier = 1;
    let dataGenMultiplier = 1;
    
    if (selectedSkillColumn === 'worms') {
      virusGenMultiplier = 2; // x2 Virus Generation
    } else if (selectedSkillColumn === 'spyware') {
      dataGenMultiplier = 2; // x2 Data Generation
    }
    // Trojan doesn't have a base multiplier, it slows debugging instead
    
    return { virusGenMultiplier, dataGenMultiplier };
  };

  const toggleSkill = (skillName: keyof SkillState) => {
    setUnlockedSkills(prev => {
      const newState = {
        ...prev,
        [skillName]: !prev[skillName]
      };
      
      // Find which column this skill belongs to
      const skillColumn = Object.entries(columnSkills).find(([_, skills]) => 
        (skills as readonly string[]).includes(skillName)
      )?.[0];
      
      // If this is the first skill being unlocked, set the selected column
      if (skillColumn && !selectedSkillColumn && newState[skillName]) {
        setSelectedSkillColumn(skillColumn);
      }
      
      // Check if all skills are now disabled - if so, reset the selected column
      const allSkillsDisabled = Object.values(newState).every(skill => !skill);
      if (allSkillsDisabled) {
        setSelectedSkillColumn(null);
      }
      
      return newState;
    });
  };

  const handleSkillTreeClick = () => {
    setIsSkillTreeOpen(true);
  };

  const closeSkillTree = () => {
    setIsSkillTreeOpen(false);
  };

  // Add useEffect to handle Adaptive Surveillance progression
  useEffect(() => {
    if (unlockedSkills.adaptiveSurveillance) {
      const interval = setInterval(() => {
        setAdaptiveSurveillanceLevel((prev) => {
          const newLevel = prev + 1;
          console.log(`Adaptive Surveillance upgraded to level ${newLevel}! Data generation bonus: +${(0.12 + newLevel * 0.02) * 100}%`);
          return newLevel;
        });
      }, 60000); // 60,000ms = 1 minute

      return () => clearInterval(interval);
    }
  }, [unlockedSkills.adaptiveSurveillance]);

  // Reset Adaptive Surveillance level when skill is disabled
  useEffect(() => {
    if (!unlockedSkills.adaptiveSurveillance) {
      setAdaptiveSurveillanceLevel(0);
    }
  }, [unlockedSkills.adaptiveSurveillance]);

  return {
    isSkillTreeOpen,
    selectedSkillColumn,
    adaptiveSurveillanceLevel,
    unlockedSkills,
    columnSkills,
    getColumnMultipliers,
    toggleSkill,
    handleSkillTreeClick,
    closeSkillTree,
  };
}

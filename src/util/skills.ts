import type { SkillState } from "../hooks/SkillHook";

export interface SkillCosts {
  [key: string]: number;
}

export const SKILL_COSTS: SkillCosts = {
  // Worms Column - Earlier skills cost less
  creepingSpawn: 50,
  protocolEfficiency: 150,
  bandwidthLeech: 250,
  replicationSurge: 400,
  
  // Trojan Column - Balanced costs
  backdoorDividend: 100,
  dormantCache: 200,
  insideJob: 0,
  stealthBuffer: 0,
  
  // Spyware Column - Higher costs for powerful skills
  dataCompression: 120,
  silentHarvest: 300,
  adaptiveSurveillance: 450,
  packetJammer: 600,
};

export interface SkillEffects {
  virusCostReduction: number;
  dataGenerationBonus: number;
  virusGenerationBonus: number;
  serverUpgradeCostReduction: number;
  dataClickBonus: number;
  autoUnlockMobileTier: boolean;
  debuggingSpeedReduction: number;
  tierCostReduction: number;
  virusDecayReduction: number;
}

export function calculateSkillEffects(
  unlockedSkills: SkillState,
  virusCount: number,
  serverExist: boolean,
  adaptiveSurveillanceLevel: number
): SkillEffects {
  let virusCostReduction = 0;
  let dataGenerationBonus = 0;
  let virusGenerationBonus = 0;
  let serverUpgradeCostReduction = 0;
  let dataClickBonus = 0;
  let debuggingSpeedReduction = 0;
  let autoUnlockMobileTier = false;
  let tierCostReduction = 0;
  let virusDecayReduction = 0;

  // Count total unlocked skills for cumulative effects
  const unlockedSkillCount = Object.values(unlockedSkills).filter(Boolean).length;

  // Worms Skills
  if (unlockedSkills.creepingSpawn) {
    autoUnlockMobileTier = true; // Auto-unlock mobile tier
  }
  if (unlockedSkills.protocolEfficiency) {
    virusCostReduction += 0.15; // -15% virus costs (was +10% data generation)
  }
  if (unlockedSkills.bandwidthLeech) {
    dataGenerationBonus += unlockedSkillCount * 0.12; // +12% passive data per unlocked skill
  }
  if (unlockedSkills.replicationSurge) {
    debuggingSpeedReduction += 0.2; // -20% debugging speed
    virusGenerationBonus += 0.3; // +30% virus replication
  }

  // Trojan Skills
  if (unlockedSkills.backdoorDividend) {
    dataGenerationBonus += 0.06; // +6% total data generation
    debuggingSpeedReduction += 0.08; // +8% debugging speed (note: this is additive with reduction)
  }
  if (unlockedSkills.dormantCache) {
    // Reduces costs of technology tiers by 18%
    tierCostReduction += 0.18; // -18% tier costs
  }
  if (unlockedSkills.insideJob) {
    // Data accumulation scales with debugging delay: +1.5% per second of delay
    // This is complex to implement without a debugging delay system
    // For now, apply a base bonus that increases with debugging speed reduction
    const debuggingDelayBonus = debuggingSpeedReduction * 1.5;
    dataGenerationBonus += debuggingDelayBonus;
  }
  if (unlockedSkills.stealthBuffer) {
    // Reduces automatic virus decay by 30%
    virusDecayReduction += 0.3; // -30% virus decay rate
  }

  // Spyware Skills
  if (unlockedSkills.dataCompression) {
    serverUpgradeCostReduction += 0.12; // -12% server upgrade costs
  }
  if (unlockedSkills.silentHarvest) {
    // Each unlocked skill contributes +12% passive data cumulatively
    dataGenerationBonus += unlockedSkillCount * 0.12; // +12% per unlocked skill
  }
  if (unlockedSkills.adaptiveSurveillance) {
    // Data accumulation grows over time: +1.5% per minute
    dataGenerationBonus += adaptiveSurveillanceLevel * 0.015; // +1.5% per minute (level)
  }
  if (unlockedSkills.packetJammer) {
    debuggingSpeedReduction += 0.25; // -25% debugging speed
    // +18% packet production would need packet system integration
    // For now, we can add a data generation bonus
    dataGenerationBonus += 0.18; // Temporary implementation as data generation bonus
  }

  return {
    virusCostReduction,
    dataGenerationBonus,
    virusGenerationBonus,
    serverUpgradeCostReduction,
    dataClickBonus,
    autoUnlockMobileTier,
    debuggingSpeedReduction,
    tierCostReduction,
    virusDecayReduction,
  };
}

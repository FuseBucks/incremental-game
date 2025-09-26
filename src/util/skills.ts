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
  insideJob: 350,
  stealthBuffer: 500,
  
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
  autoUnlockServers: boolean;
  debuggingSpeedReduction: number;
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
  let autoUnlockServers = false;

  // Worms Skills
  if (unlockedSkills.protocolEfficiency) {
    dataGenerationBonus += 0.1; // +10% passive data
  }
  if (unlockedSkills.bandwidthLeech) {
    virusCostReduction += 0.2; // -20% virus costs
  }
  if (unlockedSkills.replicationSurge) {
    virusGenerationBonus += 0.15; // +15% virus production
    debuggingSpeedReduction += 0.1; // +10% debugging speed
  }
  if (unlockedSkills.creepingSpawn) {
    autoUnlockServers = true; // Auto-unlock servers
  }

  // Trojan Skills
  if (unlockedSkills.backdoorDividend) {
    dataGenerationBonus += 0.05; // +5% data generation
    debuggingSpeedReduction += 0.1; // +10% debugging speed
  }
  if (unlockedSkills.dormantCache) {
    dataGenerationBonus += debuggingSpeedReduction; // data generation bonus based on debugging speed
  }
  if (unlockedSkills.insideJob) {
    serverUpgradeCostReduction += 0.15; // -15% server upgrade costs
  }
  // stealthBuffer: Ready for debugging speed mechanics when implemented

  // Spyware Skills
  if (unlockedSkills.dataCompression) {
    const nodeCount = serverExist ? 1 : 0; // Only count if server exists (max 1)
    dataGenerationBonus += nodeCount * 0.1; // +10% data generation per node
  }
  if (unlockedSkills.silentHarvest) {
    dataClickBonus += virusCount; // data creation bonus based on virus count
  }
  if (unlockedSkills.adaptiveSurveillance) {
    serverUpgradeCostReduction += 0.2; // -20% server upgrade costs
  }
  if (unlockedSkills.packetJammer) {
    // Base 12% + 2% per minute (level increases every minute when skill is active)
    dataGenerationBonus += 0.12 + (adaptiveSurveillanceLevel * 0.02);
  }

  return {
    virusCostReduction,
    dataGenerationBonus,
    virusGenerationBonus,
    serverUpgradeCostReduction,
    dataClickBonus,
    autoUnlockServers,
    debuggingSpeedReduction,
  };
}

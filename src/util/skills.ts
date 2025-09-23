import type { SkillState } from "../hooks/SkillHook";

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
  if (unlockedSkills.bandwidthLeech) {
    dataGenerationBonus += 0.1; // +10% passive data
  }
  if (unlockedSkills.telemetryBoost) {
    virusCostReduction += 0.2; // -20% virus costs
  }
  if (unlockedSkills.packetFragmentation) {
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
  if (unlockedSkills.insideJob) {
    dataGenerationBonus += debuggingSpeedReduction; // data generation bonus based on debugging speed
  }
  if (unlockedSkills.dormantPayload) {
    serverUpgradeCostReduction += 0.15; // -15% server upgrade costs
  }
  // insiderAccess: Ready for debugging speed mechanics when implemented

  // Spyware Skills
  if (unlockedSkills.silentHarvest) {
    const nodeCount = serverExist ? 1 : 0; // Only count if server exists (max 1)
    dataGenerationBonus += nodeCount * 0.1; // +10% data generation per node
  }
  if (unlockedSkills.bandwidthOverload) {
    dataClickBonus += virusCount; // data creation bonus based on virus count
  }
  if (unlockedSkills.dataCompression) {
    serverUpgradeCostReduction += 0.2; // -20% server upgrade costs
  }
  if (unlockedSkills.adaptiveSurveillance) {
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

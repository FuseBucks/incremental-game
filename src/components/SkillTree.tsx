"use client";
import React from "react";
import { useButton } from "../hooks/ButtonHook";

interface SkillTreeProps {
  isOpen: boolean;
  onClose: () => void;
  SkillHook: ReturnType<typeof import("../hooks/SkillHook").useSkills>;
}

export function SkillTree({ isOpen, onClose, SkillHook }: SkillTreeProps) {
  const {
    unlockedSkills,
    toggleSkill,
    selectedSkillColumn,
    columnSkills,
    canAffordSkill,
    getSkillCost,
  } = SkillHook;

  if (!isOpen) return null;

  // Check if a skill can be unlocked
  const canUnlockSkill = (skillName: keyof typeof unlockedSkills) => {
    if (unlockedSkills[skillName]) return true; // Already unlocked

    // Check if we have enough viruses to afford this skill
    if (!canAffordSkill(skillName)) return false;

    // Find which column this skill belongs to
    const skillColumn = Object.entries(columnSkills).find(([_, skills]) =>
      (skills as readonly string[]).includes(skillName),
    )?.[0];

    // If no column selected yet, or if this skill is in the selected column
    return !selectedSkillColumn || selectedSkillColumn === skillColumn;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content styled like other windows */}
      <div
        className="tab relative"
        style={{
          width: "1200px",
          height: "720px",
          cursor: "default",
        }}
      >
        {/* Window Title */}
        <div className="font-sans">Skill Tree</div>

        {/* Window Content */}
        <div className="tab-internal" style={{ width: "100%", height: "95%" }}>
          <div className="space-y-4 p-2">
            <div className="grid grid-cols-3 gap-6">
              {/* First Column - Worms */}
              <div
                className={`space-y-4 ${selectedSkillColumn && selectedSkillColumn !== "worms" ? "opacity-50" : ""}`}
              >
                <h4 className="group relative cursor-help border-b pb-2 text-center text-lg font-bold text-gray-800">
                  Worms
                  <span className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform rounded bg-black px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                    Self-replicating programs that spread across networks
                    automatically
                    <br />
                    x2 Virus Generation
                  </span>
                </h4>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Creeping Spawn
                  </h3>
                  <p className="text-sm text-gray-600">
                    Automatically unlocks the lowest tech tier.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("creepingSpawn")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.creepingSpawn
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("creepingSpawn")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.creepingSpawn &&
                        toggleSkill("creepingSpawn")
                      }
                      disabled={
                        unlockedSkills.creepingSpawn ||
                        !canUnlockSkill("creepingSpawn")
                      }
                    >
                      {unlockedSkills.creepingSpawn ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Protocol Efficiency
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reduces virus costs by 15%
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("protocolEfficiency")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.protocolEfficiency
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("protocolEfficiency")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.protocolEfficiency &&
                        toggleSkill("protocolEfficiency")
                      }
                      disabled={
                        unlockedSkills.protocolEfficiency ||
                        !canUnlockSkill("protocolEfficiency")
                      }
                    >
                      {unlockedSkills.protocolEfficiency
                        ? "Unlocked"
                        : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Bandwidth Leech
                  </h3>
                  <p className="text-sm text-gray-600">
                    All unlocked skills produce +12% passive data per tick
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("bandwidthLeech")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.bandwidthLeech
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("bandwidthLeech")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.bandwidthLeech &&
                        toggleSkill("bandwidthLeech")
                      }
                      disabled={
                        unlockedSkills.bandwidthLeech ||
                        !canUnlockSkill("bandwidthLeech")
                      }
                    >
                      {unlockedSkills.bandwidthLeech ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Replication Surge
                  </h3>
                  <p className="text-sm text-gray-600">
                    Lowers debugging speed by 20% and raises virus replication
                    by 30%
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("replicationSurge")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.replicationSurge
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("replicationSurge")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.replicationSurge &&
                        toggleSkill("replicationSurge")
                      }
                      disabled={
                        unlockedSkills.replicationSurge ||
                        !canUnlockSkill("replicationSurge")
                      }
                    >
                      {unlockedSkills.replicationSurge ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Second Column - Trojan */}
              <div
                className={`space-y-4 ${selectedSkillColumn && selectedSkillColumn !== "trojan" ? "opacity-50" : ""}`}
              >
                <h4 className="group relative cursor-help border-b pb-2 text-center text-lg font-bold text-gray-800">
                  Trojan
                  <span className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform rounded bg-black px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                    Disguised malware that appears harmless but steals data
                    secretly
                    <br />
                    Slows Debugging Speed by 50%
                  </span>
                </h4>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Backdoor Dividend
                  </h3>
                  <p className="text-sm text-gray-600">
                    +6% total virus production and +8% debugging speed
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("backdoorDividend")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.backdoorDividend
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("backdoorDividend")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.backdoorDividend &&
                        toggleSkill("backdoorDividend")
                      }
                      disabled={
                        unlockedSkills.backdoorDividend ||
                        !canUnlockSkill("backdoorDividend")
                      }
                    >
                      {unlockedSkills.backdoorDividend ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">Dormant Cache</h3>
                  <p className="text-sm text-gray-600">
                    Reduces costs of technology tiers by 18%
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("dormantCache")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.dormantCache
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("dormantCache")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.dormantCache &&
                        toggleSkill("dormantCache")
                      }
                      disabled={
                        unlockedSkills.dormantCache ||
                        !canUnlockSkill("dormantCache")
                      }
                    >
                      {unlockedSkills.dormantCache ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">Inside Job</h3>
                  <p className="text-sm text-gray-600">
                    Data accumulation scales with debugging delay: +1.5% per
                    second of delay
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("insideJob")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.insideJob
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("insideJob")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.insideJob && toggleSkill("insideJob")
                      }
                      disabled={
                        unlockedSkills.insideJob || !canUnlockSkill("insideJob")
                      }
                    >
                      {unlockedSkills.insideJob ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Stealth Buffer
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reduces automatic virus decay by 30%
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("stealthBuffer")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.stealthBuffer
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("stealthBuffer")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.stealthBuffer &&
                        toggleSkill("stealthBuffer")
                      }
                      disabled={
                        unlockedSkills.stealthBuffer ||
                        !canUnlockSkill("stealthBuffer")
                      }
                    >
                      {unlockedSkills.stealthBuffer ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Third Column - Spyware */}
              <div
                className={`space-y-4 ${selectedSkillColumn && selectedSkillColumn !== "spyware" ? "opacity-50" : ""}`}
              >
                <h4 className="group relative cursor-help border-b pb-2 text-center text-lg font-bold text-gray-800">
                  Spyware
                  <span className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform rounded bg-black px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
                    Surveillance software that monitors and collects user
                    information
                    <br />
                    x2 Data Generation
                  </span>
                </h4>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Data Compression
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reduces server upgrade costs by 12%
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("dataCompression")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.dataCompression
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("dataCompression")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.dataCompression &&
                        toggleSkill("dataCompression")
                      }
                      disabled={
                        unlockedSkills.dataCompression ||
                        !canUnlockSkill("dataCompression")
                      }
                    >
                      {unlockedSkills.dataCompression ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Silent Harvest
                  </h3>
                  <p className="text-sm text-gray-600">
                    Each unlocked skill contributes +12% virus production
                    cumulatively
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("silentHarvest")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.silentHarvest
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("silentHarvest")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.silentHarvest &&
                        toggleSkill("silentHarvest")
                      }
                      disabled={
                        unlockedSkills.silentHarvest ||
                        !canUnlockSkill("silentHarvest")
                      }
                    >
                      {unlockedSkills.silentHarvest ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">
                    Adaptive Surveillance
                  </h3>
                  <p className="text-sm text-gray-600">
                    Data accumulation grows over time: +1.5% per minute.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("adaptiveSurveillance")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.adaptiveSurveillance
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("adaptiveSurveillance")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.adaptiveSurveillance &&
                        toggleSkill("adaptiveSurveillance")
                      }
                      disabled={
                        unlockedSkills.adaptiveSurveillance ||
                        !canUnlockSkill("adaptiveSurveillance")
                      }
                    >
                      {unlockedSkills.adaptiveSurveillance
                        ? "Unlocked"
                        : "Unlock"}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">Packet Jammer</h3>
                  <p className="text-sm text-gray-600">
                    Lowers debugging speed by 25% and increases packet
                    production by 18%.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Cost: {getSkillCost("packetJammer")} viruses
                    </span>
                    <button
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                        unlockedSkills.packetJammer
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : canUnlockSkill("packetJammer")
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                      onClick={() =>
                        !unlockedSkills.packetJammer &&
                        toggleSkill("packetJammer")
                      }
                      disabled={
                        unlockedSkills.packetJammer ||
                        !canUnlockSkill("packetJammer")
                      }
                    >
                      {unlockedSkills.packetJammer ? "Unlocked" : "Unlock"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

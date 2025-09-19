"use client";
import React, { useState } from "react";

interface SkillTreeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SkillTree({ isOpen, onClose }: SkillTreeProps) {
  if (!isOpen) return null;

  // State to track which skills are unlocked
  const [unlockedSkills, setUnlockedSkills] = useState({
    creepingSpawn: false,
    bandwidthLeech: false,
    telemetryBoost: false,
    packetFragmentation: false,
    backdoorDividend: false,
    insideJob: false,
    dormantPayload: false,
    insiderAccess: false,
    speedBoost: false,
    bandwidthOverload: false,
    adaptiveSurveillance: false,
    dataCompression: false,
  });

  // Define which skills belong to which column
  const columnSkills = {
    worms: ['creepingSpawn', 'bandwidthLeech', 'telemetryBoost', 'packetFragmentation'],
    trojan: ['backdoorDividend', 'insideJob', 'dormantPayload', 'insiderAccess'],
    spyware: ['speedBoost', 'bandwidthOverload', 'adaptiveSurveillance', 'dataCompression']
  };

  // Get the selected column (if any)
  const getSelectedColumn = () => {
    for (const [column, skills] of Object.entries(columnSkills)) {
      if (skills.some(skill => unlockedSkills[skill as keyof typeof unlockedSkills])) {
        return column;
      }
    }
    return null;
  };

  const selectedColumn = getSelectedColumn();

  // Check if a skill can be unlocked
  const canUnlockSkill = (skillName: keyof typeof unlockedSkills) => {
    if (unlockedSkills[skillName]) return true; // Already unlocked
    
    // Find which column this skill belongs to
    const skillColumn = Object.entries(columnSkills).find(([_, skills]) => 
      skills.includes(skillName as string)
    )?.[0];

    // If no column selected yet, or if this skill is in the selected column
    return !selectedColumn || selectedColumn === skillColumn;
  };

  const toggleSkill = (skillName: keyof typeof unlockedSkills) => {
    if (!canUnlockSkill(skillName)) return;
    
    setUnlockedSkills(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Modal Content styled like other windows */}
      <div 
        className="tab relative"
        style={{
          width: "900px",
          height: "720px",
          cursor: "default"
        }}
      >
        {/* Window Title */}
        <div className="font-sans">Skill Tree</div>
        
        {/* Window Content */}
        <div 
          className="tab-internal"
          style={{ width: "100%", height: "95%",}}
        >
          <div className="space-y-4 p-2">
            <div className="grid grid-cols-3 gap-6">
              {/* First Column - Worms */}
              <div className={`space-y-4 ${selectedColumn && selectedColumn !== 'worms' ? 'opacity-50' : ''}`}>
                <h4 className="text-lg text-center font-bold text-gray-800 border-b pb-2 relative group cursor-help">
                  Worms
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Self-replicating programs that spread across networks automatically<br />x2 Virus Generation
                  </span>
                </h4>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Creeping Spawn</h3>
                  <p className="text-sm text-gray-600">Automatically unlocks the lowest tech tier.</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.creepingSpawn 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('creepingSpawn')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('creepingSpawn')}
                    disabled={!canUnlockSkill('creepingSpawn')}
                  >
                    {unlockedSkills.creepingSpawn ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Bandwidth Leech</h3>
                  <p className="text-sm text-gray-600">All existing nodes produce +10% passive data</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.bandwidthLeech 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('bandwidthLeech')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('bandwidthLeech')}
                    disabled={!canUnlockSkill('bandwidthLeech')}
                  >
                    {unlockedSkills.bandwidthLeech ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Telemetry Boost</h3>
                  <p className="text-sm text-gray-600">Reduces virus costs by 8%</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.telemetryBoost 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('telemetryBoost')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('telemetryBoost')}
                    disabled={!canUnlockSkill('telemetryBoost')}
                  >
                    {unlockedSkills.telemetryBoost ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Packet Fragmentation</h3>
                  <p className="text-sm text-gray-600">Reduces debugging speed while increasing virus production</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.packetFragmentation 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('packetFragmentation')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('packetFragmentation')}
                    disabled={!canUnlockSkill('packetFragmentation')}
                  >
                    {unlockedSkills.packetFragmentation ? 'In use' : 'Locked'}
                  </button>
                </div>
              </div>

              {/* Second Column - Trojan */}
              <div className={`space-y-4 ${selectedColumn && selectedColumn !== 'trojan' ? 'opacity-50' : ''}`}>
                <h4 className="text-lg text-center font-bold text-gray-800 border-b pb-2 relative group cursor-help">
                  Trojan
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Disguised malware that appears harmless but steals data secretly<br />Slows Debugging Speed by 50%
                  </span>
                </h4>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Backdoor Dividend</h3>
                  <p className="text-sm text-gray-600">+5% data generation and +10% debugging speed</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.backdoorDividend 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('backdoorDividend')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('backdoorDividend')}
                    disabled={!canUnlockSkill('backdoorDividend')}
                  >
                    {unlockedSkills.backdoorDividend ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Inside Job</h3>
                  <p className="text-sm text-gray-600">Data generation scales with debugging speed</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.insideJob 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('insideJob')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('insideJob')}
                    disabled={!canUnlockSkill('insideJob')}
                  >
                    {unlockedSkills.insideJob ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Dormant Payload</h3>
                  <p className="text-sm text-gray-600">Reduces tech tier costs</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.dormantPayload 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('dormantPayload')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('dormantPayload')}
                    disabled={!canUnlockSkill('dormantPayload')}
                  >
                    {unlockedSkills.dormantPayload ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Insider Access</h3>
                  <p className="text-sm text-gray-600">Unlocking tech tier does not increase debugging speed</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.insiderAccess 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('insiderAccess')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('insiderAccess')}
                    disabled={!canUnlockSkill('insiderAccess')}
                  >
                    {unlockedSkills.insiderAccess ? 'In use' : 'Locked'}
                  </button>
                </div>
              </div>

              {/* Third Column - Spyware */}
              <div className={`space-y-4 ${selectedColumn && selectedColumn !== 'spyware' ? 'opacity-50' : ''}`}>
                <h4 className="text-lg text-center font-bold text-gray-800 border-b pb-2 relative group cursor-help">
                  Spyware
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Surveillance software that monitors and collects user information<br />x2 Data Generation
                  </span>
                </h4>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Silent Harvest</h3>
                  <p className="text-sm text-gray-600">+10% data generation per unlocked node</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.speedBoost 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('speedBoost')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('speedBoost')}
                    disabled={!canUnlockSkill('speedBoost')}
                  >
                    {unlockedSkills.speedBoost ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Bandwidth Overload</h3>
                  <p className="text-sm text-gray-600">Increases the effectiveness of data creation</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.bandwidthOverload 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('bandwidthOverload')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('bandwidthOverload')}
                    disabled={!canUnlockSkill('bandwidthOverload')}
                  >
                    {unlockedSkills.bandwidthOverload ? 'In use' : 'Locked'}
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Data Compression</h3>
                  <p className="text-sm text-gray-600">Reduces server upgrade costs</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.dataCompression 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('dataCompression')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('dataCompression')}
                    disabled={!canUnlockSkill('dataCompression')}
                  >
                    {unlockedSkills.dataCompression ? 'In use' : 'Locked'}
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Adaptive Surveillance</h3>
                  <p className="text-sm text-gray-600">Gradually increases data generation</p>
                  <button 
                    className={`mt-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                      unlockedSkills.adaptiveSurveillance 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : canUnlockSkill('adaptiveSurveillance')
                        ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toggleSkill('adaptiveSurveillance')}
                    disabled={!canUnlockSkill('adaptiveSurveillance')}
                  >
                    {unlockedSkills.adaptiveSurveillance ? 'In use' : 'Locked'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
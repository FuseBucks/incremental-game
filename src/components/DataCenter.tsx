export function DataCenter({
  handleServerClick,
  showServerUpgrades,
}: {
  handleServerClick: () => void;
  showServerUpgrades: boolean;
}) {
  return (
    <>
      <div className="select-none">
        <div className="h-40 overflow-y-auto border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] bg-black p-2 text-green-400">
          <p>&gt; aLpha-01 datacenter booting...</p>
          <p>&gt; Loading shard modules...</p>
          <p>&gt; Module [PacketSynth Mk I] initialized.</p>
          <p>&gt; Connection link: STABLE</p>
          <p>
            &gt; <span className="animate-pulse">_</span>
          </p>
        </div>

        <div className="m-4 border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] p-2 text-center">
          Status: <span className="font-bold text-green-700">Online</span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleServerClick}
            className={`rounded border px-4 py-2 transition-colors ${
              showServerUpgrades
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white hover:bg-gray-100"
            } group relative`}
          >
            {showServerUpgrades ? "Close Upgrades" : "Modify Server"}
          </button>
        </div>
      </div>
    </>
  );
}

interface ServerUpgradesProps {
  packetCount: number;
  handleServerUpgrade: (type: string) => void;
  upgVirusCost: number;
  upgDataCost: number;
  upgPacketCost: number;
  upgVirusLevel: number;
  upgDataLevel: number;
  upgPacketLevel: number;
  skillEffects: {
    serverUpgradeCostReduction: number;
  };
}

export function ServerUpgrades({
  packetCount,
  handleServerUpgrade,
  upgVirusCost,
  upgDataCost,
  upgPacketCost,
  upgVirusLevel,
  upgDataLevel,
  upgPacketLevel,
  skillEffects,
}: ServerUpgradesProps) {
  const upgObject: {
    [key: string]: {
      name: string;
      level: number;
      cost: number;
      effectiveCost: number;
      type: string;
    };
  } = {
    virus: {
      name: "Virus",
      level: upgVirusLevel,
      cost: upgVirusCost,
      effectiveCost: Math.floor(upgVirusCost * (1 - skillEffects.serverUpgradeCostReduction)),
      type: "virus",
    },
    data: {
      name: "Data",
      level: upgDataLevel,
      cost: upgDataCost,
      effectiveCost: Math.floor(upgDataCost * (1 - skillEffects.serverUpgradeCostReduction)),
      type: "data",
    },
    packet: {
      name: "Packet",
      level: upgPacketLevel,
      cost: upgPacketCost,
      effectiveCost: Math.floor(upgPacketCost * (1 - skillEffects.serverUpgradeCostReduction)),
      type: "packet",
    },
  };

  return (
    <>
      <div className="select-none">
        <div className="mb-4 flex items-center justify-center">
          <h2 className="text-lg font-bold">Server Upgrades</h2>
        </div>

        <div className="flex flex-col justify-between">
          {Object.entries(upgObject).map(([key, upg]) => {
            const canBuy = packetCount >= upg.effectiveCost;

            return (
              <button
                key={key}
                onClick={() => handleServerUpgrade(upg.type)}
                disabled={!canBuy}
                className={`group relative mb-2 flex w-40 flex-col items-center justify-between rounded border bg-white p-2 transition-colors ${
                  !canBuy
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{upg.name}</div>
                <span className="text-center text-[10px]">
                  {upg.level === 0 ? (
                    <div className="flex flex-col items-center">
                      <div className="text-gray-500">Locked</div>
                      <div>Cost: {upg.effectiveCost} Packets</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div>Level: {upg.level}</div>
                      <div>Cost: {upg.effectiveCost} Packets</div>
                    </div>
                  )}
                </span>

                <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:block group-hover:bg-black group-hover:opacity-100">
                  {!canBuy
                    ? `Need ${upg.effectiveCost - packetCount} more packets`
                    : upg.level === 0
                      ? `Unlock ${upg.name} upgrade`
                      : `Upgrade ${upg.name} to level ${upg.level + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

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
        <div className="mb-4 rounded text-center">
          <div className="font-semibold text-red-600">aLpha-01</div>
        </div>

        <div className="mb-4 h-50 rounded bg-blue-300 p-2">
          server asset will be placed here
        </div>

        <div className="mb-4 rounded bg-green-400 p-2 text-center">test</div>

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
}: ServerUpgradesProps) {
  const upgObject: {
    [key: string]: {
      name: string;
      level: number;
      cost: number;
      type: string;
    };
  } = {
    virus: {
      name: "Virus",
      level: upgVirusLevel,
      cost: upgVirusCost,
      type: "virus",
    },
    data: {
      name: "Data",
      level: upgDataLevel,
      cost: upgDataCost,
      type: "data",
    },
    packet: {
      name: "Packet",
      level: upgPacketLevel,
      cost: upgPacketCost,
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
            const canBuy = packetCount >= upg.cost;

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
                      <div>Cost: {upg.cost} Packets</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div>Level: {upg.level}</div>
                      <div>Cost: {upg.cost} Packets</div>
                    </div>
                  )}
                </span>

                <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {!canBuy
                    ? `Need ${upg.cost - packetCount} more packets`
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

import { useState } from "react";

type TierDetails = {
  id: string;
  name: string;
  dataCost: number;
  virusCost: number;
  multiplier: number;
  acquired: boolean;
};

type TierProps = {
  virusCount: number;
  dataCount: number;
  dataMultiplier: number;
  virusMultiplier: number;
  setMultiplierValue: (m: number) => void;
  setDataCount: React.Dispatch<React.SetStateAction<number>>;
  setVirusCount: React.Dispatch<React.SetStateAction<number>>;
};

export function Tier({
  virusCount,
  dataCount,
  setMultiplierValue,
  dataMultiplier,
  virusMultiplier,
  setDataCount,
  setVirusCount,
}: TierProps) {
  const [tiers, setTiers] = useState<TierDetails[]>([
    {
      id: "mobile",
      name: "Mobile Tier",
      dataCost: 1,
      virusCost: 1,
      multiplier: 3,
      acquired: false,
    },
    {
      id: "pc",
      name: "PC Tier",
      dataCost: 500,
      virusCost: 200,
      multiplier: 5,
      acquired: false,
    },
    {
      id: "server",
      name: "Server Tier",
      dataCost: 2000,
      virusCost: 800,
      multiplier: 10,
      acquired: false,
    },
    {
      id: "nasa",
      name: "NASA Tier",
      dataCost: 10000,
      virusCost: 5000,
      multiplier: 25,
      acquired: false,
    },
  ]);

  function handlePurchase(tier: TierDetails) {
    if (dataCount >= tier.dataCost && virusCount >= tier.virusCost) {
      setTiers((prev) =>
        prev.map((t) => (t.id === tier.id ? { ...t, acquired: true } : t)),
      );
      setMultiplierValue(tier.multiplier);
      setDataCount((prev) => prev - tier.dataCost);
      setVirusCount((prev) => prev - tier.virusCost);
    }
  }

  return (
    <div className="select-none">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">System Tiers</h2>
      </div>
      <p className="mb-4 text-sm">
        Upgrade your system to increase virus and data production.
      </p>
      <div className="mb-3 text-sm">
        Current multipliers: Data x{dataMultiplier}, Virus x{virusMultiplier}
      </div>
      {/*Component for all the tier*/}
      <div className="space-y-4">
        {tiers.map((tier, index) => {
          const canAfford =
            dataCount >= tier.dataCost && virusCount >= tier.virusCost;
          const prevTierAcquired = index === 0 || tiers[index - 1].acquired;

          return (
            // Container for each specific tier
            <div
              key={tier.id}
              className={`rounded border p-3 ${
                tier.acquired
                  ? "border-green-500 bg-green-100"
                  : prevTierAcquired
                    ? canAfford
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                    : "border-gray-400 bg-gray-100 opacity-60"
              }`}
            >
              {/*Eto yung title ng tier tas kung ilang multiplier. mawawala multiplier if nabile na*/}
              <div className="flex items-center justify-between">
                <span className="font-medium">{tier.name}</span>
                <span className="text-sm">
                  {tier.acquired
                    ? "Acquired"
                    : `${tier.multiplier}x multiplier`}
                </span>
              </div>
              {/*yung cost*/}
              {!tier.acquired && (
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs">
                    <div>Data: {tier.dataCost}</div>
                    <div>Virus: {tier.virusCost}</div>
                  </div>

                  <button
                    onClick={() => handlePurchase(tier)}
                    disabled={!canAfford || !prevTierAcquired}
                    className={`rounded px-3 py-1 text-sm ${
                      canAfford && prevTierAcquired
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "cursor-not-allowed bg-gray-300 text-gray-600"
                    }`}
                  >
                    {prevTierAcquired ? "Purchase" : "Locked"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

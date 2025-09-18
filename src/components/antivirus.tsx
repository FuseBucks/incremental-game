import React, { useEffect, useState } from "react";

export function AntiVirusProgressBar({ progress }: { progress: number }) {
  const segments = 20;
  const filled = Math.round((progress / 100) * segments);

  return (
    <div
      className="flex items-center rounded border border-blue-700 bg-[#e9e9e9] p-1 shadow-inner"
      style={{
        width: 300,
        height: 22,
        boxShadow: "inset 1px 1px 2px #fff, inset -1px -1px 2px #b5b5b5",
        overflow: "hidden",
      }}
    >
      <div className="flex h-full w-full gap-[2px]">
        {Array.from({ length: segments }).map((_, i) =>
          i < filled ? (
            <div
              key={i}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 2,
                background: "linear-gradient(180deg, #b6ff8e 0%, #4ec601 100%)",
                border: "1px solid #8fd16a",
                boxShadow: "0 1px 2px #fff",
                transition: "background 0.3s",
              }}
            />
          ) : (
            <div
              key={i}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 2,
                background: "transparent",
                border: "1px solid transparent",
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}

// This is the full Antivirus window, including progress logic
export function AntivirusWindow({
  onClose,
}: {
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="m-2 flex flex-col gap-4">
      <div className="flex justify-center">
        <AntiVirusProgressBar progress={progress} />
      </div>
      <div>
        <p className="tahoma text-[12px]">
          Antivirus Software is under development.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function AntivirusWarning({ onClose }: { onClose: () => void }) {
  return (
    <div className="m-2 flex flex-col gap-4">
      <p className="text-lg font-bold text-red-600">
        Anti-Virus Detected!
      </p>
      <p className="tahoma text-[12px]">
        Your virus has been detected by the BOUNTY HUNTERS. They
        are attempting to remove it. Deploy more virus to
        increase your chances of survival.
      </p>
      <div className="flex justify-center">
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}


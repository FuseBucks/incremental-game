// read commit message for more context on the structuring

"use client";
import { useButton } from "../hooks/buttonHook";

export function MainWindow() {
  // use custom hook to manage button states, para malinis
  const { virusCount, dataCount, handleDataClick, handleVirusClick } =
    useButton();

  return (
    <>
      {/* resource board */}
      <div className="tab absolute top-20 ml-4 h-auto w-65">
        <div className="font-sans">Resources</div>
        <div className="mt-2 flex flex-col gap-1 bg-[#d8d4d4] font-mono text-xs text-gray-800">
          <div className="m-2">
            <p>Virus: {virusCount}</p>
            <p>Data: {dataCount}</p>
          </div>
        </div>
      </div>

      {/* action btn */}
      <div className="tab">
        {" "}
        Virus (C:)
        <div className="tab-internal">
          <div className="flex gap-4">
            <button onClick={handleDataClick}>Data</button>
            <button onClick={handleVirusClick}>Virus</button>
          </div>
        </div>
      </div>
    </>
  );
}

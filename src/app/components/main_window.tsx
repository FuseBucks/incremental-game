"use client";
import { useState } from "react";


export function MainWindow() {
  const [dataCount, setDataCount] = useState(0);
  const [virusCount, setVirusCount] = useState(0);

  const handleDataClick = () => {
    setDataCount(dataCount + 1);
  };

  const handleVirusClick = () => {
    setVirusCount(virusCount + 1);
  };
  return (
    <>
      {/* resource board */}
      <div className="absolute top-20 ml-4 h-auto w-65 rounded-md bg-gray-400 p-4 font-bold text-black">
        <div className="m-0 bg-green-400 p-1">Resources</div>
        <div className="mt-2 flex flex-col gap-2 text-xs">
          <p>Virus: {virusCount}</p>
          <p>Data: {dataCount}</p>
        </div>
      </div>

      {/* action btn */}
      
        <div className="tab"> Virus (C:)
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

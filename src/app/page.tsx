// "use client";
import { Resources } from "./components/resources";
import { useState } from "react";
import VirusButton from "./components/main_window/virus_button";
import DataButton from "./components/main_window/data_button";

export default function Home() {
  const [dataCount, setDataCount] = useState(0);
  const [virusCount, setVirusCount] = useState(0);

  const handleDataClick = () => {
    setDataCount(dataCount + 1);
  };

  const handleVirusClick = () => {
    setVirusCount(virusCount + 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="flex gap-4">
          <DataButton onClick={handleDataClick} />
          <VirusButton onClick={handleVirusClick} />
        </div>
      </div>
    </div>
  );
}

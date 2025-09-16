"use client";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex gap-4">
          <DataButton onClick={handleDataClick} />
          <VirusButton onClick={handleVirusClick} />
        </div>
      </div>
    </div>
  );
}
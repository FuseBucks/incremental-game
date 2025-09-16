"use client";
import { useState } from "react";
import { MainWindow } from "./components/main_window";


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
    <div className="flex min-h-screen items-center justify-center">
          <div>
            <MainWindow />
          </div>
    </div>
  );
}

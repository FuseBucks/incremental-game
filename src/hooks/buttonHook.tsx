// hook folder will contain logic to manage features where client interaction is needed  (e.g. useState, useEffect, etc)

"use client";
import { useState } from "react";

export function useButton() {
  const [dataCount, setDataCount] = useState(0);
  const [virusCount, setVirusCount] = useState(0);

  const handleDataClick = () => {
    setDataCount(dataCount + 1);
  };
  const handleVirusClick = () => {
    setVirusCount(virusCount + 1);
  };

  return {
    virusCount,
    dataCount,
    handleDataClick,
    handleVirusClick,
  };
}

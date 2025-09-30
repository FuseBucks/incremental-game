"use client";
import { MainWindow } from "../components/MainWindow";
import { Applications } from "../components/Applications";
import { TaskBar } from "../components/TaskBar";
import { useState } from "react";
import { GameWindow } from "../types/windows";
import { ApplicationType } from "../types/windows";
import { useSkills } from "../hooks/SkillHook"; // yipee

export default function Home() {
  // Initialize states that will be shared between hooks
  const [virusCount, setVirusCount] = useState(0);

  const SkillHook = useSkills(virusCount, setVirusCount); // Pass virus count and setter

  const [application, setApplication] = useState<ApplicationType[]>([
    { id: "virus", title: "Virus" },
    { id: "resources", title: "Resources" },
  ]);

  const [windows, setWindows] = useState<GameWindow[]>([
    {
      id: "resources",
      title: "Resources",
      x: 160,
      y: 40,
      w: 260,
      h: 110,
      open: false,
    },
    {
      id: "virus",
      title: "Virus",
      x: 750,
      y: 320,
      w: 360,
      h: 180,
      open: false,
    },
    {
      id: "data-center",
      title: "C:\\SERVER\\ALPHA-01.EXE",
      x: 400,
      y: 300,
      w: 400,
      h: 400,
      open: false,
    },
    {
      id: "server-upgrades",
      title: "Server Upgrades",
      x: 1000,
      y: 300,
      w: 400,
      h: 300,
      open: false,
    },
    {
      id: "tier",
      title: "Tier",
      x: 900,
      y: 150,
      w: 500,
      h: 600,
      open: false,
    },
  ]);

  const handleApplication = (app: ApplicationType) => {
    setApplication([...application, app]);
  };

  function toggleWindow(id: string) {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, open: !w.open } : w)),
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MainWindow
        SkillHook={SkillHook} // PASS IT PASS IT UUUUUUUHHHHHH
        onAddApp={handleApplication}
        windows={windows}
        setWindows={setWindows}
        virusCount={virusCount}
        setVirusCount={setVirusCount}
      />
      <div className="absolute top-7 left-1">
        {application.map((app, idx) => (
          <Applications
            key={idx}
            id={app.id}
            title={app.title}
            toggleWindow={toggleWindow}
            isOpen={windows.find((w) => w.id === app.id)?.open || false}
          />
        ))}
      </div>
      <TaskBar SkillHook={SkillHook} />
    </div>
  );
}

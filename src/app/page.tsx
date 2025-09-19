"use client";
import { MainWindow } from "../components/main_window";
import { TaskBar } from "../components/task_bar";
import { Application } from "../components/application";
import { useState } from "react";
import App from "next/app";

type Application = {
  id: string;
  title: string;
};

export default function Home() {
  const [application, setApplication] = useState<Application[]>([
    { id: "virus", title: "Virus" },
    { id: "resources", title: "Resources" },
    { id: "Antivirus Software", title: "Antivirus Software" },
  ]);

  // Function: app must match Application type
  const handleApplication = (app: Application) => {
    setApplication([...application, app]);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MainWindow onAddApp={handleApplication} />

      <div className="absolute top-7 left-1">
        {application.map((app, idx) => (
          <Application key={idx} id={app.id} title={app.title} />
        ))}
      </div>

      <TaskBar />
    </div>
  );
}

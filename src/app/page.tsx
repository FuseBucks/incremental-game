import { MainWindow } from "../components/main_window";
import { TaskBar } from "../components/TaskBar";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div>
        <MainWindow />
        <TaskBar />
      </div>
    </div>
  );
}

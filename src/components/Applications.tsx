// BADING BADING BADING
export function Applications({
  id,
  title,
  toggleWindow,
}: {
  id: string;
  title: string;
  toggleWindow: (id: string) => void;
}) {
  function handleOpenWindow() {
    toggleWindow(id);
  }

  return (
    <div
      className="flex h-22 w-24 cursor-pointer flex-col items-center justify-center px-1 text-center select-none"
      onClick={handleOpenWindow}
    >
      <img className="h-12 w-12" src="folder.png" alt="App icon" />
      <span className="text-sm text-black">{title}</span>
    </div>
  );
}

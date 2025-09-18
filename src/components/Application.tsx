// BADING BADING BADING
export function Application({ id, title }: { id: string; title: string }) {
  return (
    <div className="flex h-22 w-24 flex-col items-center justify-center px-5 py-2 select-none">
      <img className="h-12 w-12" src="folder.png" alt="App icon" />
      <span className="text-sm text-black">{title}</span>
    </div>
  );
}

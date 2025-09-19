export function TaskBar() {
  return (
    <>
      <div className="fixed bottom-0 w-screen bg-blue-700 p-1 pl-0">
        <div className="flex h-full items-center">
          <div className="flex w-32 cursor-pointer items-center gap-2 rounded-l-2xl rounded-r-full bg-green-600 py-1 pr-3 pl-3 text-lg font-bold text-white select-none hover:bg-green-700">
            <img className="h-5 w-5" src="windowsLogo.png" />
            start
          </div>
        </div>
      </div>
    </>
  );
}

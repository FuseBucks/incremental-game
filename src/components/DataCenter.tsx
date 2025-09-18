export function DataCenter({
  handleServerClick,
  showServerUpgrades,
}: {
  handleServerClick: () => void;
  showServerUpgrades: boolean;
}) {
  return (
    <>
      <div className="select-none">
        <div className="mb-4 rounded text-center">
          <div className="font-semibold text-red-600">aLpha-01</div>
        </div>

        <div className="mb-4 h-50 rounded bg-blue-300 p-2">
          server asset will be placed here
        </div>

        <div className="mb-4 rounded bg-green-400 p-2 text-center">test</div>

        <div className="flex justify-center">
          <button
            onClick={handleServerClick}
            className={`rounded border px-4 py-2 transition-colors ${
              showServerUpgrades
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white hover:bg-gray-100"
            } group relative`}
          >
            {showServerUpgrades ? "Close Upgrades" : "Modify Server"}
          </button>
        </div>
      </div>
    </>
  );
}

export function ServerUpgrades() {
  return (
    <>
      <div className="select-none">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Server Upgrades</h2>
        </div>

        <div className="space-y-3">test</div>
      </div>
    </>
  );
}

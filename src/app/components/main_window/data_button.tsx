interface DataButtonProps {
  onClick: () => void;
}

export default function DataButton({ onClick }: DataButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
    >
      Data
    </button>
  );
}
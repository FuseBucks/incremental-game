interface VirusButtonProps {
  onClick: () => void;
}

export default function VirusButton({ onClick }: VirusButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
    >
      Virus
    </button>
  );
}
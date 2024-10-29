import { Settings, RotateCcw, Play } from 'lucide-react';

interface ControlsProps {
  onReset: () => void;
  onSettingsClick: () => void;
  moves: number;
}

export function Controls({ onReset,  onSettingsClick, moves }: ControlsProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl px-4 py-3 bg-white rounded-lg shadow-md">
      <button
        onClick={onSettingsClick}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Settings className="w-6 h-6" />
      </button>
      
      <div className="text-lg font-semibold text-gray-700">
        Moves: {moves}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        
      </div>
    </div>
  );
}
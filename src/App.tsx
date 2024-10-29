import { useState, useCallback, useEffect } from 'react';
import { Stack } from './stack';
import { Disc, Tower } from './types';
import { TowerPole } from './Components/TowerPole';
import { Controls } from './Components/Controls';
import { SettingsModal } from './Components/SettingsModal';
import { AnimatePresence } from 'framer-motion';
import DemoModal from './Components/DemoModal'; 

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#06b6d4', '#6366f1', '#d946ef'
];

function App() {
  const [numDiscs, setNumDiscs] = useState(3);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showDemo, setShowDemo] = useState(false); 

  const initializeTowers = useCallback(() => {
    const initialTowers: Tower[] = [[], [], []];
    initialTowers[0] = Array.from({ length: numDiscs }, (_, i) => ({
      size: numDiscs - i,
      color: COLORS[i % COLORS.length],
    }));
    setTowers(initialTowers);
    setMoves(0);
    setSelectedTower(null);
  }, [numDiscs]);

  useEffect(() => {
    initializeTowers();
    setShowDemo(true); 
  }, [initializeTowers]);

  const handleTowerClick = (towerIndex: number) => {
    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      if (selectedTower !== towerIndex) {
        const sourceStack = new Stack<Disc>();
        const targetStack = new Stack<Disc>();

        towers[selectedTower].forEach(disc => sourceStack.push(disc));
        towers[towerIndex].forEach(disc => targetStack.push(disc));

        const discToMove = sourceStack.peek();
        const topDisc = targetStack.peek();

        if (!discToMove) return;

        if (!topDisc || discToMove.size < topDisc.size) {
          const newTowers = [...towers];
          newTowers[selectedTower] = newTowers[selectedTower].slice(0, -1);
          newTowers[towerIndex] = [...newTowers[towerIndex], discToMove];
          setTowers(newTowers);
          setMoves(moves + 1);
        }
      }
      setSelectedTower(null);
    }
  };

  const canDropOnTower = (towerIndex: number) => {
    if (selectedTower === null) return false;
    if (selectedTower === towerIndex) return false;

    const sourceDisc = towers[selectedTower][towers[selectedTower].length - 1];
    const targetDisc = towers[towerIndex][towers[towerIndex].length - 1];

    return !targetDisc || sourceDisc.size < targetDisc.size;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-center mb-6">
          <Controls
            moves={moves}
            onReset={initializeTowers}
            onSettingsClick={() => setShowSettings(true)}
          />
        </div>
        <div className="flex flex-row md:flex-row gap-4 justify-center items-stretch overflow-x-auto">
          {towers.map((tower, index) => (
            <TowerPole
              key={index}
              discs={tower}
              maxDiscs={numDiscs}
              onClick={() => handleTowerClick(index)}
              isSelected={selectedTower === index}
              canDrop={selectedTower !== null && canDropOnTower(index)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          discs={numDiscs}
          onDiscsChange={(value) => {
            setNumDiscs(value);
            initializeTowers();
          }}
        />
        <DemoModal
          isOpen={showDemo}
          onClose={() => setShowDemo(false)}
        />
      </AnimatePresence>
    </div>
  );
}



export default App;

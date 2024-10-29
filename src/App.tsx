import { useState, useCallback, useEffect } from 'react';
import { Stack } from './stack';
import { Disc, Tower } from './types';
import { TowerPole } from './Components/TowerPole';
import { Controls } from './Components/Controls';
import { SettingsModal } from './Components/SettingsModal';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isWin, setIsWin] = useState(false);

  const initializeTowers = useCallback(() => {
    const initialTowers: Tower[] = [[], [], []];
    initialTowers[0] = Array.from({ length: numDiscs }, (_, i) => ({
      size: numDiscs - i,
      color: COLORS[i % COLORS.length],
    }));
    setTowers(initialTowers);
    setMoves(0);
    setSelectedTower(null);
    setIsWin(false);
  }, [numDiscs]);

  useEffect(() => {
    initializeTowers();
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


          if (newTowers[2].length === numDiscs) {
            setIsWin(true);
          }
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

        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
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
        {isWin && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4">Congratulations!</h2>
              <p className="mb-4">You completed the puzzle in {moves} moves!</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={initializeTowers}
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


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
      </AnimatePresence>
    </div>
  );
}

export default App;

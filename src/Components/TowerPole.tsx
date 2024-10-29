import { Disc as DiscType } from '../types';
import { Disc } from './Disc_set';
import { motion } from 'framer-motion';

interface TowerPoleProps {
  discs: DiscType[];
  maxDiscs: number;
  onClick: () => void;
  isSelected: boolean;
  canDrop: boolean;
}

export function TowerPole({ discs, maxDiscs, onClick, isSelected, canDrop }: TowerPoleProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`flex flex-col justify-end items-center gap-1 p-4 rounded-lg transition-colors
        ${isSelected ? 'bg-blue-100' : canDrop ? 'bg-green-50' : 'bg-gray-50'}
        cursor-pointer relative w-full md:w-1/4 h-[300px] md:h-[400px]`}
    >
      <div className="absolute w-4 h-4/5 bg-gray-300 rounded-t-full" />
      <div className="w-20 h-4 bg-gray-400 rounded-lg mt-auto" />
      <div className="flex flex-col-reverse gap-1 w-full items-center absolute bottom-12">
        {discs.map((disc, index) => (
          <Disc
            key={`${disc.size}-${index}`}
            size={disc.size}
            color={disc.color}
            maxSize={maxDiscs}
          />
        ))}
      </div>
    </motion.div>
  );
}
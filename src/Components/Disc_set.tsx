import { motion } from 'framer-motion';

interface DiscProps {
  size: number;
  color: string;
  maxSize: number;
}

export function Disc({ size, color, maxSize }: DiscProps) {
  const width = 20 + (size * 60) / maxSize;
  
  return (
    <motion.div
      layout
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="h-4 md:h-6 rounded-full"
      style={{
        width: `${width}%`,
        backgroundColor: color,
      }}
    />
  );
}
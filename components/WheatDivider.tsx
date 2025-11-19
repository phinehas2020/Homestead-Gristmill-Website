import React from 'react';
import { motion } from 'framer-motion';

const WheatDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full flex justify-center py-12 opacity-60 ${className}`}>
      <motion.svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <path
          d="M2 10C15 10 25 2 40 2C55 2 65 18 80 18C95 18 105 5 120 5C135 5 145 15 160 15C175 15 185 8 198 8"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};

export default WheatDivider;
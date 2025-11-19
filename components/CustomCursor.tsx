
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CursorVariant } from '../types';

interface CustomCursorProps {
  variant: CursorVariant;
  isMenuOpen?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ variant, isMenuOpen = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      // If menu is open (dark background), use Cream cursor. Else use Forest (light background).
      backgroundColor: isMenuOpen ? "#F9F7F2" : "rgba(26, 58, 42, 0.8)",
      mixBlendMode: "normal" as const,
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgb(255, 255, 255)",
      mixBlendMode: "difference" as const,
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 16,
      height: 32,
      width: 8,
      backgroundColor: "#D4AF37", // Gold
      mixBlendMode: "normal" as const,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] backdrop-blur-[1px]"
      variants={variants}
      animate={variant}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.8
      }}
    />
  );
};

export default CustomCursor;

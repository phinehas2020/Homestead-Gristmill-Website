
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

  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleActivity = () => {
      setIsVisible(true);
      if (isMobile) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    };

    if (isMobile) {
      window.addEventListener('touchstart', handleActivity);
      window.addEventListener('touchmove', handleActivity);
      window.addEventListener('click', handleActivity);

      // Initial timeout
      timeout = setTimeout(() => setIsVisible(false), 1000);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('touchstart', handleActivity);
        window.removeEventListener('touchmove', handleActivity);
        window.removeEventListener('click', handleActivity);
        clearTimeout(timeout);
      }
    };
  }, [isMobile]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: isMenuOpen ? "#F9F7F2" : "rgba(26, 58, 42, 0.8)",
      mixBlendMode: "normal" as const,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgb(255, 255, 255)",
      mixBlendMode: "difference" as const,
      opacity: isVisible ? 1 : 0,
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 16,
      height: 32,
      width: 8,
      backgroundColor: "#D4AF37",
      mixBlendMode: "normal" as const,
      opacity: isVisible ? 1 : 0,
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
        mass: 0.8,
        opacity: { duration: 0.3 }
      }}
    />
  );
};

export default CustomCursor;

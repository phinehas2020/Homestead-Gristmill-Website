
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Hero: React.FC<HeroProps> = ({ onHoverStart, onHoverEnd }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="mill" className="relative h-screen w-full overflow-x-hidden flex flex-col">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        {/* The Scrim Gradient - Hard Stop for Zone Defense */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, #1A3A2A 0%, rgba(26, 58, 42, 0.95) 30%, rgba(26, 58, 42, 0) 70%)'
          }}
        />

        {/* Hero Image - Wheat Macro */}
        <img
          src="/hero-wheat.png"
          alt="Golden Wheat Macro"
          className="w-full h-[120%] object-cover object-right md:object-center"
        />
      </motion.div>

      {/* Vertical "Est. 1904" Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden md:block"
      >
        <span className="block text-gold font-sans uppercase tracking-[0.3em] text-xs -rotate-90 whitespace-nowrap origin-center">
          Est. 1904 &mdash; Central Texas
        </span>
      </motion.div>

      {/* Content Layer - Aligned Left in the dark zone */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 px-6 md:px-24 max-w-7xl w-full mx-auto flex flex-col items-start text-left pt-[25vh] md:pt-[30vh]"
      >
        {/* Mobile only Est label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:hidden block text-gold font-sans uppercase tracking-[0.3em] text-xs mb-4"
        >
          Est. 1904
        </motion.span>

        <div
          className="font-serif text-6xl md:text-9xl lg:text-[10rem] text-cream mb-12 relative z-50 flex flex-col items-start"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="block leading-[1.3] pt-4 pb-4 overflow-visible origin-left"
          >
            Eat
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="block leading-[1.3] pt-2 overflow-visible origin-left"
          >
            Different.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          className="font-sans text-cream/90 text-lg md:text-xl max-w-md font-light leading-relaxed tracking-wide ml-1"
        >
          Slow food for a fast world. We mill heritage grains for people who give a damn about what they eat.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 z-20 flex items-center gap-4"
      >
        <div className="w-16 h-[1px] bg-cream/30 overflow-hidden relative">
          <motion.div
            className="w-full h-full bg-gold absolute top-0 left-0"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-cream/60 text-xs uppercase tracking-widest font-sans">Begin</span>
      </motion.div>
    </section>
  );
};

export default Hero;

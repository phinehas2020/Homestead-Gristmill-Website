
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Manifesto: React.FC = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="relative py-48 bg-forest flex items-center justify-center min-h-[80vh]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none" />
      
      <motion.div 
        style={{ scale, opacity }}
        className="relative z-10 text-center w-full flex flex-col items-center"
      >
        <div className="px-4">
            <motion.h2 
                style={{ y: yText }}
                className="font-serif text-[15vw] leading-[0.85] text-cream font-bold tracking-tighter text-center uppercase space-y-4 md:space-y-6"
            >
                <span className="block text-gold mix-blend-hard-light">Eat</span>
                <span className="block text-cream mix-blend-difference">Different</span>
            </motion.h2>
        </div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 max-w-xl mx-auto px-6"
        >
            <p className="font-sans text-cream/60 text-lg md:text-xl font-light tracking-wide leading-relaxed text-center">
                Refuse the industrial standard. Choose food that fought to be here.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-10 bg-clay text-cream px-10 py-4 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300"
            >
              Shop the Harvest
            </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent opacity-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bone to-transparent opacity-10" />
    </section>
  );
};

export default Manifesto;

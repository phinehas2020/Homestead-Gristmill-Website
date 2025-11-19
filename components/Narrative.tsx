
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WheatDivider from './WheatDivider';

const Narrative: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="story" ref={containerRef} className="bg-cream relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Part 1: The Problem */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32">
          <div className="w-full md:w-1/2">
             <motion.div 
               style={{ y: ySlow }}
               className="relative"
             >
                {/* Sterile, cold, industrial image */}
                <img 
                  src="https://images.unsplash.com/photo-1533656627582-62c96d08e07a?q=80&w=1000&auto=format&fit=crop" 
                  alt="Sterile industrial environment" 
                  className="w-full h-[600px] object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-[2000ms] ease-out rounded-[40px_10px_50px_20px]"
                />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-bone rounded-full -z-10 opacity-50" />
             </motion.div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               viewport={{ once: true }}
               className="text-clay font-bold uppercase tracking-widest text-sm"
            >
              The Disconnect
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl text-forest leading-tight"
            >
              We forgot how to <span className="italic text-loam">eat</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-sans text-xl text-loam/80 leading-relaxed"
            >
              Modern flour is dead. It’s been stripped of its oils, its nutrients, and its soul to sit on a shelf for two years. It is white powder, not food.
            </motion.p>
          </div>
        </div>

        <WheatDivider />

        {/* Part 2: The Solution */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 mt-32">
           <div className="w-full md:w-1/2">
             <motion.div 
               style={{ y: yFast }}
               className="relative"
             >
                {/* Warm, textural, messy hands image */}
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088b7280?q=80&w=1000&auto=format&fit=crop" 
                  alt="Hands kneading dough on rustic table" 
                  className="w-full h-[600px] object-cover sepia-[0.3] hover:sepia-0 transition-all duration-[2000ms] ease-out rounded-[20px_100px_30px_80px]"
                />
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-gold/20 rounded-full -z-10 blur-3xl" />
             </motion.div>
          </div>
          <div className="w-full md:w-1/2 space-y-8 text-left md:text-right">
            <motion.span 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               viewport={{ once: true }}
               className="text-gold font-bold uppercase tracking-widest text-sm"
            >
              The Return
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl text-forest leading-tight"
            >
              Life returns to the <span className="text-clay">stone</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-sans text-xl text-loam/80 leading-relaxed"
            >
              We mill cool and slow. Our stones crush the grain, preserving the germ and the bran. It smells like grass and rain. It bakes loaves that sing.
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Narrative;

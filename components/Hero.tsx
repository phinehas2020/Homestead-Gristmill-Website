import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, Leaf, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="mill" className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[10%] -bottom-[10%] inset-x-0 z-0"
      >
        {/* The Scrim Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, #1A3A2A 0%, rgba(26, 58, 42, 0.85) 40%, rgba(26, 58, 42, 0.2) 75%, rgba(26, 58, 42, 0) 100%)'
          }}
        />

        {/* Hero Image */}
        <img
          src="/hero-holiday.png"
          alt="Homestead Gristmill holiday Table"
          className="w-full h-full object-cover object-[65%_center] md:object-center"
        />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 px-6 md:pl-24 md:pr-24 max-w-7xl w-full mx-auto flex flex-col items-start text-left h-full justify-center pb-32 md:pb-0"
      >
        {/* Vertical Est Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="hidden md:block absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30"
        >
          <span className="block text-gold font-sans uppercase tracking-[0.3em] text-xs -rotate-90 whitespace-nowrap origin-center">
            Est. 2003 &mdash; Central Texas
          </span>
        </motion.div>

        {/* Mobile Est label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:hidden block text-gold font-sans uppercase tracking-[0.3em] text-xs mb-4"
        >
          Stone-Ground Heritage Flour
        </motion.span>

        {/* Main Headline */}
        <div className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-cream mb-6 relative z-50 flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="block leading-[1.1] overflow-visible origin-left"
          >
            Eat
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="block leading-[1.1] overflow-visible origin-left"
          >
            Different.
          </motion.span>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          className="font-sans text-cream/90 text-lg md:text-xl max-w-md font-light leading-relaxed tracking-wide mb-8"
        >
          Stone-ground heritage flour, milled fresh weekly. For bakers who taste the difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/products')}
            className="group bg-clay hover:bg-gold text-cream px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-300 hover:gap-5"
          >
            Shop Our Flour
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-cream/10 hover:bg-cream/20 text-cream border border-cream/30 px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm transition-all duration-300 backdrop-blur-sm"
          >
            View Bestsellers
          </button>
        </motion.div>
      </motion.div>

      {/* Trust Bar - Bottom of Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 inset-x-0 z-30 bg-forest/80 backdrop-blur-md border-t border-cream/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-24 py-4 md:py-5">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
            {/* Trust Items */}
            <div className="flex items-center gap-3 text-cream/80">
              <Clock size={18} className="text-gold" />
              <span className="font-sans text-xs md:text-sm uppercase tracking-wider">Milled Fresh Weekly</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-cream/20" />
            <div className="flex items-center gap-3 text-cream/80">
              <Leaf size={18} className="text-gold" />
              <span className="font-sans text-xs md:text-sm uppercase tracking-wider">Non-GMO Heritage Grains</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-cream/20" />
            <div className="flex items-center gap-3 text-cream/80">
              <Truck size={18} className="text-gold" />
              <span className="font-sans text-xs md:text-sm uppercase tracking-wider">Ships Nationwide</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

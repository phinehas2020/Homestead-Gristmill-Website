import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, Leaf, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="mill" className="relative h-[85vh] md:h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[10%] -bottom-[10%] inset-x-0 z-[var(--z-base)]"
      >
        {/* The Scrim Gradient */}
        <div
          className="absolute inset-0 z-[var(--z-above)]"
          style={{
            background: 'linear-gradient(90deg, rgba(31, 52, 39, 0.95) 0%, rgba(31, 52, 39, 0.85) 42%, rgba(31, 52, 39, 0.35) 72%, rgba(246, 238, 228, 0) 100%)'
          }}
        />

        {/* Hero Image - Responsive & Optimized */}
        <picture>
          {/* WebP format for modern browsers - Mobile */}
          <source
            media="(max-width: 768px)"
            srcSet="/hero-holiday.png?width=800&format=webp"
            type="image/webp"
          />
          {/* WebP format for modern browsers - Desktop */}
          <source
            srcSet="/hero-holiday.png?width=1920&format=webp"
            type="image/webp"
          />
          {/* Fallback PNG - Mobile */}
          <source
            media="(max-width: 768px)"
            srcSet="/hero-holiday.png?width=800"
          />
          {/* Fallback PNG - Desktop */}
          <img
            src="/hero-holiday.png"
            alt="Homestead Gristmill holiday Table"
            className="w-full h-full object-cover object-[65%_center] md:object-center"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ opacity }}
        className="relative z-[var(--z-dropdown)] px-6 md:pl-24 md:pr-24 max-w-7xl w-full mx-auto flex flex-col items-start text-left h-full justify-center pb-16 md:pb-32"
      >
        {/* Vertical Est Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="hidden md:block absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-[var(--z-sticky)]"
        >
          <span className="block text-gold font-sans uppercase tracking-[0.3em] text-xs -rotate-90 whitespace-nowrap origin-center">
            Est. 2003 &mdash; Central Texas
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="font-serif text-5xl md:text-8xl lg:text-[9rem] text-cream mb-6 relative z-[var(--z-modal)] flex flex-col items-start text-balance">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="block leading-[0.95] md:leading-[1.1] overflow-visible origin-left"
          >
            Eat
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="block leading-[0.95] md:leading-[1.1] overflow-visible origin-left"
          >
            Different.
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          className="font-sans text-cream/90 text-base md:text-lg lg:text-xl max-w-lg font-light leading-relaxed tracking-wide mb-8 text-pretty"
        >
          Stone-ground heritage flour, milled fresh weekly. For bakers who taste the difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate('/products')}
            className="group w-full sm:w-auto bg-clay hover:bg-sage text-cream px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-colors duration-200 shadow-[0_18px_45px_-30px_rgba(32,24,16,0.7)]"
          >
            Shop Our Flour
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-cream/20 hover:bg-cream/30 text-cream border border-cream/40 px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm transition-colors duration-200"
          >
            View Bestsellers
          </button>
        </motion.div>

      </motion.div>

      {/* Trust Bar - Bottom of Hero - Hidden on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
        className="hidden md:block absolute bottom-0 inset-x-0 z-[var(--z-sticky)] bg-forest/80 border-t border-cream/15"
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

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
}

const Hero: React.FC<HeroProps> = ({ products, addToCart }) => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="mill" className="relative h-[115vh] md:h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[15%] -bottom-[15%] inset-x-0 z-0"
      >
        {/* The Scrim Gradient - Deep and Immersive */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, #1A3A2A 0%, rgba(26, 58, 42, 0.95) 40%, rgba(26, 58, 42, 0) 85%)'
          }}
        />

        <img
          src="/hero-product.png"
          alt="Artisanal Stone-Ground Flour"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 px-6 md:px-24 max-w-7xl w-full mx-auto flex flex-col items-start text-left h-full justify-center pt-24"
      >
        <div className="font-serif text-7xl md:text-[10rem] lg:text-[13rem] text-cream relative z-50 flex flex-col items-start leading-[0.85] tracking-tighter">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="block py-2"
          >
            Eat
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="block py-2"
          >
            Different.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          className="font-sans text-cream/80 text-lg md:text-xl max-w-md font-light leading-relaxed tracking-wide mt-12 ml-2"
        >
          Slow food for a fast world. We stone-mill heritage grains for people who care about the honest table.
        </motion.p>
      </motion.div>

      {/* Subtle Shoppable Footer - Peak Above the Fold */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 inset-x-0 z-30 px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 md:gap-24">
          <div className="flex-1 w-full border-t border-cream/10 pt-8">
            <h3 className="font-serif text-xl md:text-2xl text-cream mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-gold" />
              Featured Harvest
            </h3>
            <div className="grid grid-cols-3 gap-6 md:gap-12">
              {products.slice(0, 3).map((product, i) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.handle}`)}
                >
                  <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="font-serif text-sm md:text-lg text-cream border-b border-transparent group-hover:border-cream/40 transition-all inline-block">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-6 group mb-2"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/40 group-hover:text-gold transition-colors">
              Enter The Catalog
            </span>
            <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
              <ArrowRight className="text-cream group-hover:text-gold w-4 h-4" />
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

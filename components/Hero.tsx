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
    <section id="mill" className="relative min-h-[110vh] md:h-screen w-full overflow-hidden flex flex-col pt-24">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[15%] -bottom-[15%] inset-x-0 z-0"
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(26, 58, 42, 0.9) 0%, rgba(26, 58, 42, 0.4) 50%, rgba(26, 58, 42, 0) 100%)'
          }}
        />

        <img
          src="/hero-product.png"
          alt="Artisanal Stone-Ground Flour"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="container mx-auto max-w-7xl px-6 relative z-20 flex flex-col h-full justify-between pb-12">
        {/* Main Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-12 md:mt-24">
          <motion.div
            style={{ opacity }}
            className="flex-1 text-left"
          >
            <div className="font-serif text-6xl md:text-8xl lg:text-[7rem] text-cream mb-6 flex flex-col items-start leading-[1.1]">
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                Eat
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                Different.
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="font-sans text-cream/90 text-lg md:text-xl max-w-md font-light leading-relaxed tracking-wide mb-8"
            >
              Stone-ground heritage grains for people who care about what they eat. Milled fresh in Central Texas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex gap-4"
            >
              <button
                onClick={() => navigate('/products')}
                className="bg-gold text-forest px-8 py-4 rounded-full font-sans uppercase tracking-widest text-xs font-bold hover:bg-cream transition-colors shadow-xl"
              >
                Shop All Flour
              </button>
            </motion.div>
          </motion.div>

          {/* Featured Product Bag Cutout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-[500px] hidden lg:block"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gold/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <img
                src="/hero-bag.png"
                alt="Featured Product"
                className="w-full h-auto relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>

        {/* Quick Shop Row (Above the Fold) */}
        <div className="mt-12 md:mt-24">
          <div className="flex justify-between items-end mb-8 border-b border-cream/20 pb-4">
            <h3 className="font-serif text-2xl text-cream">The Harvest Pantry</h3>
            <button
              onClick={() => navigate('/products')}
              className="font-sans text-xs uppercase tracking-[0.2em] text-gold hover:text-cream flex items-center gap-2 transition-colors"
            >
              View Full Catalog <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {products.slice(0, 3).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (i * 0.1), duration: 0.8 }}
                className="bg-cream/5 backdrop-blur-md border border-cream/10 p-4 rounded-lg flex items-center gap-4 hover:bg-cream/10 transition-colors cursor-pointer group"
                onClick={() => navigate(`/product/${product.handle}`)}
              >
                <div className="w-16 h-20 md:w-20 md:h-24 bg-cream/20 rounded overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm md:text-base text-cream truncate">{product.name}</h4>
                  <p className="font-sans text-[10px] text-cream/40 uppercase tracking-widest mt-1">${product.price.toFixed(2)}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="mt-2 text-[10px] text-gold uppercase tracking-widest font-bold flex items-center gap-1 hover:text-cream transition-colors"
                  >
                    Quick Add <ShoppingBag size={10} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, Filter } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Harvest' },
  { id: 'wheat', label: 'Heritage Wheat' },
  { id: 'corn', label: 'Corn & Grits' },
  { id: 'rye', label: 'Rye' },
  { id: 'goods', label: 'Dry Goods' },
];

const ProductsPage: React.FC<ProductsPageProps> = ({ products, addToCart, onHoverStart, onHoverEnd }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-bone min-h-screen pt-32 pb-24 px-6"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-forest/10 pb-12">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-serif text-6xl md:text-8xl text-forest mb-6"
            >
              The Catalog
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-sans text-loam/80 text-lg max-w-lg leading-relaxed"
            >
              Our full selection of stone-ground grains. Milled fresh to order in Central Texas. 
            </motion.p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-6 mt-8 md:mt-0">
             {CATEGORIES.map((cat, i) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 onMouseEnter={onHoverStart}
                 onMouseLeave={onHoverEnd}
                 className={`font-sans uppercase tracking-widest text-sm transition-all duration-300 pb-1 border-b-2 ${
                   activeCategory === cat.id 
                     ? 'text-clay border-clay' 
                     : 'text-loam/40 border-transparent hover:text-forest'
                 }`}
               >
                 {cat.label}
               </button>
             ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/5] mb-8 bg-cream overflow-hidden rounded-[4px]">
                   <div className="absolute inset-0 bg-forest/5 group-hover:bg-transparent transition-colors duration-700" />
                   <motion.img 
                     src={product.image}
                     alt={product.name}
                     className="w-full h-full object-cover mix-blend-multiply contrast-[1.05] brightness-105 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                   />
                   
                   {/* Quick Add Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-forest/10 backdrop-blur-[1px]">
                      <button
                        onClick={() => addToCart(product)}
                        onMouseEnter={onHoverStart}
                        onMouseLeave={onHoverEnd}
                        className="bg-cream text-forest px-8 py-4 rounded-full font-sans uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-forest transition-colors shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                      >
                        Add to Sack — ${product.price.toFixed(2)}
                      </button>
                   </div>
                </div>

                {/* Text Area */}
                <div className="text-center md:text-left">
                   <div className="flex justify-between items-baseline mb-2">
                     <h3 className="font-serif text-2xl text-forest group-hover:text-clay transition-colors duration-300">{product.name}</h3>
                     <span className="font-sans text-forest font-medium">${product.price.toFixed(2)}</span>
                   </div>
                   <p className="font-sans text-loam/60 text-xs uppercase tracking-widest mb-3">{product.weight} • {product.category}</p>
                   <p className="font-sans text-loam/80 leading-relaxed text-sm max-w-sm">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-serif text-3xl text-loam/40">The pantry is empty for this selection.</p>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ProductsPage;

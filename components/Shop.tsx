
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, Star } from 'lucide-react';

interface ShopProps {
  products: Product[];
  addToCart: (product: Product) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const ProductCard: React.FC<{ product: Product; addToCart: (p: Product) => void; onHoverStart: () => void; onHoverEnd: () => void }> = ({ product, addToCart, onHoverStart, onHoverEnd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center text-center"
    >
      {/* Image Container with Organic Shape */}
      <div
        className="relative w-full aspect-[3/4] mb-8 overflow-hidden bg-bone transition-all duration-700 ease-in-out"
        style={{ borderRadius: '200px 200px 20px 20px' }} // Flour Sack Shape
      >
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-1000 z-10" />
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        />

        {/* Floating Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-forest text-cream px-6 py-3 rounded-full flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 hover:bg-clay"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          <span className="font-sans text-sm uppercase tracking-wide">Add to Sack</span>
          <ShoppingBag size={16} />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-serif text-3xl text-forest">{product.name}</h3>
        <p className="font-sans text-loam/60 text-sm uppercase tracking-widest">{product.weight}</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <p className="font-sans font-medium text-lg text-clay">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Shop: React.FC<ShopProps> = ({ products, addToCart, onHoverStart, onHoverEnd }) => {
  return (
    <section className="bg-bone py-32 px-6 min-h-screen" id="shop">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-serif text-6xl md:text-8xl text-forest mb-6"
          >
            The Pantry
          </motion.h2>
          <p className="font-sans text-loam text-lg">
            Small batches. Stone ground. Packed by hand in unbleached cotton sacks.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                // Use specific seeds for flour textures based on index/id
                image: index === 0 ? "https://picsum.photos/seed/brown_paper_flour_sack/600/800" :
                  index === 1 ? "https://picsum.photos/seed/dark_rye_grain_texture/600/800" :
                    "https://picsum.photos/seed/white_pastry_flour_pile/600/800"
              }}
              addToCart={addToCart}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;

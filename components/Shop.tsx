
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ShopProps {
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
}

const ProductCard: React.FC<{
  product: Product;
  addToCart: (p: Product, quantity?: number) => void;
  index: number;
}> = ({ product, addToCart, index }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleProductClick = () => {
    navigate(`/product/${product.handle}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    await addToCart(product, quantity);
    setIsAdding(false);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group relative flex flex-col bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      {/* Image Container */}
      <div
        onClick={handleProductClick}
        className="relative w-full aspect-square overflow-hidden bg-bone cursor-pointer"
      >
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-forest/90 text-cream px-3 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-widest backdrop-blur-sm">
            {product.category === 'wheat' ? 'Heritage Wheat' :
             product.category === 'corn' ? 'Stone-Ground Corn' :
             product.category === 'rye' ? 'Heritage Rye' : 'Dry Goods'}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-500 z-10" />

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Quick View on Hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        >
          <span className="bg-cream/95 text-forest px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest shadow-lg">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3
            onClick={handleProductClick}
            className="font-serif text-2xl md:text-3xl text-forest mb-2 cursor-pointer hover:text-clay transition-colors leading-tight"
          >
            {product.name}
          </h3>
          <p className="font-sans text-loam/60 text-sm mb-4">{product.weight}</p>
        </div>

        {/* Price & Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-serif text-2xl text-clay">${product.price.toFixed(2)}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-1 bg-bone rounded-full p-1">
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={14} className={quantity <= 1 ? 'text-loam/30' : 'text-forest'} />
              </button>
              <span className="w-8 text-center font-sans text-sm text-forest">{quantity}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
              >
                <Plus size={14} className="text-forest" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button - Always Visible */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
            className={`w-full py-4 rounded-full font-sans uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              justAdded
                ? 'bg-green-600 text-cream'
                : 'bg-forest text-cream hover:bg-clay'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={18} />
                Added to Sack
              </>
            ) : isAdding ? (
              <span className="animate-pulse">Adding...</span>
            ) : (
              <>
                <ShoppingBag size={18} />
                Add to Sack
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-bone py-24 md:py-32 px-6" id="shop">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-clay font-sans uppercase tracking-[0.2em] text-xs mb-4 block"
            >
              Bestsellers
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl text-forest"
            >
              The Pantry
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => navigate('/products')}
            className="group flex items-center gap-2 text-forest hover:text-clay transition-colors font-sans uppercase tracking-widest text-sm"
          >
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="font-sans text-loam/70 text-lg mb-6">
            Looking for something specific? We have over 20 varieties of heritage flour.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-clay hover:bg-forest text-cream px-10 py-4 rounded-full font-sans uppercase tracking-widest text-sm transition-colors duration-300"
          >
            Browse Full Collection
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Shop;

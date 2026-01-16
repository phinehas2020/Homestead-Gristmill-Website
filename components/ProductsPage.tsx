
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, Search, X, Plus, Minus, Check, SlidersHorizontal } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ProductsPageProps {
  products: Product[];
  addToCart: (product: Product, quantity?: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'wheat', label: 'Heritage Wheat' },
  { id: 'corn', label: 'Corn & Grits' },
  { id: 'rye', label: 'Rye' },
  { id: 'goods', label: 'Dry Goods' },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A-Z' },
];

// Product Card Component
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-cream/90 rounded-2xl overflow-hidden soft-card transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image Container */}
      <div
        onClick={handleProductClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleProductClick(); } }}
        role="button"
        tabIndex={0}
        className="relative w-full aspect-square overflow-hidden bg-cream/70 cursor-pointer"
        aria-label={`View ${product.name} details`}
      >
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-forest/90 text-cream px-2.5 py-1 rounded-full font-sans text-[9px] uppercase tracking-widest backdrop-blur-sm">
            {product.category === 'wheat' ? 'Wheat' :
             product.category === 'corn' ? 'Corn' :
             product.category === 'rye' ? 'Rye' : 'Goods'}
          </span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-300 flex items-center justify-center">
          <span className="bg-cream/95 text-forest px-4 py-2 rounded-full font-sans text-[10px] uppercase tracking-widest shadow-lg border border-forest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex-grow mb-3">
          <h3 className="font-serif text-lg md:text-xl text-forest mb-1 leading-tight line-clamp-2">
            <button
              onClick={handleProductClick}
              className="text-left hover:text-clay transition-colors cursor-pointer"
            >
              {product.name}
            </button>
          </h3>
          <p className="font-sans text-loam/50 text-xs">{product.weight}</p>
        </div>

        {/* Price & Quantity Row */}
        <div className="flex items-center justify-between mb-3">
          <p className="font-serif text-xl text-clay tabular-nums">${product.price.toFixed(2)}</p>

          {/* Compact Quantity Selector */}
          <div className="flex items-center gap-0.5 bg-cream/80 border border-forest/10 rounded-full p-0.5">
            <button
              onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
              className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} className={quantity <= 1 ? 'text-loam/30' : 'text-forest'} />
            </button>
            <span className="w-8 md:w-6 text-center font-sans text-xs text-forest" aria-live="polite">{quantity}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
              className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} className="text-forest" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || justAdded}
          className={`w-full py-3.5 md:py-3 rounded-full font-sans uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
            justAdded
              ? 'bg-green-600 text-cream'
              : 'bg-forest text-cream hover:bg-clay'
          }`}
        >
          {justAdded ? (
            <>
              <Check size={14} />
              Added
            </>
          ) : isAdding ? (
            <span className="animate-pulse">Adding...</span>
          ) : (
            <>
              <ShoppingBag size={14} />
              Add to Sack
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const ProductsPage: React.FC<ProductsPageProps> = ({ products, addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Sync category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.find(c => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  // Get counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = products.filter(p => p.category === cat.id).length;
      }
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bone min-h-screen pb-24"
    >
      {/* Hero Header - Full bleed from top */}
      <div className="bg-forest text-cream pt-32 md:pt-36 pb-12 md:pb-16 px-6 mb-8 rounded-b-[2.5rem] md:rounded-b-none shadow-[0_18px_60px_-40px_rgba(18,13,9,0.7)]">
        <div className="container mx-auto max-w-7xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 text-balance"
          >
            Shop All Flour
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-sans text-cream/70 text-lg md:text-xl max-w-xl text-pretty"
          >
            Stone-ground heritage grains, milled fresh weekly in Central Texas.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-cream/90 backdrop-blur-md py-4 px-4 md:px-6 mb-8 border border-forest/10 rounded-2xl shadow-[0_16px_40px_-35px_rgba(32,24,16,0.45)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Tabs - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2.5 rounded-full font-sans text-sm transition-all duration-300 flex items-center gap-2 border ${
                    activeCategory === cat.id
                      ? 'bg-forest text-cream border-forest'
                      : 'bg-cream/90 text-forest border-forest/10 hover:bg-forest/10'
                  }`}
                >
                  {cat.label}
                  <span className={`text-xs ${activeCategory === cat.id ? 'text-cream/70' : 'text-loam/50'}`}>
                    {categoryCounts[cat.id]}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-cream px-4 py-2 rounded-full font-sans text-sm text-forest border border-forest/10"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeCategory !== 'all' && (
                <span className="bg-clay text-cream text-xs px-2 py-0.5 rounded-full">1</span>
              )}
            </button>

            {/* Search & Sort */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-loam/40" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-cream rounded-full pl-10 pr-4 py-2 font-sans text-sm text-forest placeholder:text-loam/40 border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-loam/40 hover:text-forest"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream rounded-full px-4 py-2 font-sans text-sm text-forest border border-forest/10 focus:outline-none focus:ring-2 focus:ring-forest/20 cursor-pointer"
                aria-label="Sort products by"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Category Pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategoryChange(cat.id);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-2.5 rounded-full font-sans text-xs transition-all duration-300 border ${
                        activeCategory === cat.id
                          ? 'bg-forest text-cream border-forest'
                          : 'bg-cream text-forest border-forest/10'
                      }`}
                    >
                      {cat.label} ({categoryCounts[cat.id]})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="font-sans text-sm text-loam/60">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="font-sans text-sm text-clay hover:text-forest transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              index={0}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center"
          >
            <p className="font-serif text-3xl text-forest mb-4">No products found</p>
            <p className="font-sans text-loam/60 mb-8">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="bg-forest text-cream px-6 py-3 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-clay transition-colors"
            >
              View All Products
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;

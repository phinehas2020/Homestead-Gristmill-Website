
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, ArrowLeft, Wheat, Minus, Plus, Check, Truck, Clock, Leaf, ChevronRight } from 'lucide-react';

interface ProductDetailProps {
    products: Product[];
    addToCart: (product: Product, quantity?: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
    const { handle } = useParams<{ handle: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [activeVariant, setActiveVariant] = useState<{ id: string; title: string; price: number; image?: string } | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    useEffect(() => {
        if (products.length > 0 && handle) {
            const found = products.find(p => p.handle === handle);
            if (found) {
                setProduct(found);
                if (found.variants && found.variants.length > 0) {
                    setActiveVariant(found.variants[0]);
                }
            }
        }
    }, [products, handle]);

    // Get related products (same category, excluding current)
    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [products, product]);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    const handleAddToCart = async () => {
        if (product && activeVariant) {
            setIsAdding(true);
            await addToCart({
                ...product,
                variantId: activeVariant.id,
                price: activeVariant.price,
                weight: activeVariant.title
            }, quantity);
            setIsAdding(false);
            setJustAdded(true);
            setTimeout(() => {
                setJustAdded(false);
            }, 3000);
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'wheat': return 'Heritage Wheat';
            case 'corn': return 'Stone-Ground Corn';
            case 'rye': return 'Heritage Rye';
            case 'goods': return 'Dry Goods';
            default: return cat;
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center pt-24">
                <p className="font-serif text-2xl text-forest animate-pulse">Loading...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-bone min-h-screen pt-24 pb-24"
        >
            {/* Breadcrumb */}
            <div className="bg-cream border-b border-forest/5">
                <div className="container mx-auto max-w-7xl px-6 py-4">
                    <nav className="flex items-center gap-2 font-sans text-sm text-loam/60">
                        <button onClick={() => navigate('/')} className="hover:text-forest transition-colors">
                            Home
                        </button>
                        <ChevronRight size={14} />
                        <button onClick={() => navigate('/products')} className="hover:text-forest transition-colors">
                            Shop
                        </button>
                        <ChevronRight size={14} />
                        <button
                            onClick={() => navigate(`/products?category=${product.category}`)}
                            className="hover:text-forest transition-colors"
                        >
                            {getCategoryLabel(product.category)}
                        </button>
                        <ChevronRight size={14} />
                        <span className="text-forest truncate max-w-[150px]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative aspect-square bg-cream rounded-2xl overflow-hidden shadow-lg">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeVariant?.image || product.image}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={activeVariant?.image || product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-forest/90 text-cream px-3 py-1.5 rounded-full font-sans text-xs uppercase tracking-widest backdrop-blur-sm">
                                    {getCategoryLabel(product.category)}
                                </span>
                            </div>
                        </div>

                        {/* Variant Image Thumbnails */}
                        {product.variants && product.variants.length > 1 && (
                            <div className="flex gap-3 mt-4">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setActiveVariant(variant)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            activeVariant?.id === variant.id
                                                ? 'border-forest'
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={variant.image || product.image}
                                            alt={variant.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        {/* Title & Price */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Wheat size={16} className="text-gold" />
                                <span className="font-sans text-xs uppercase tracking-widest text-loam/60">
                                    Stone Ground Fresh
                                </span>
                            </div>

                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-4 leading-[1.1]">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-3">
                                <p className="font-serif text-3xl text-clay">
                                    ${(activeVariant?.price || product.price).toFixed(2)}
                                </p>
                                <span className="font-sans text-loam/50 text-sm">
                                    / {activeVariant?.title || product.weight}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-loam/80 text-lg leading-relaxed mb-8">
                            {product.description || "Fresh-milled heritage flour, stone-ground to preserve the whole grain's natural nutrition and flavor. Perfect for artisan baking."}
                        </p>

                        {/* Variant Selector */}
                        {product.variants && product.variants.length > 1 && (
                            <div className="mb-8">
                                <label className="font-sans text-xs uppercase tracking-widest text-forest mb-3 block">
                                    Select Size
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setActiveVariant(variant)}
                                            className={`px-5 py-3 rounded-full border-2 transition-all duration-300 font-sans text-sm ${
                                                activeVariant?.id === variant.id
                                                    ? 'bg-forest text-cream border-forest'
                                                    : 'bg-transparent text-forest border-forest/20 hover:border-forest'
                                            }`}
                                        >
                                            {variant.title} — ${variant.price.toFixed(2)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center bg-cream border border-forest/10 rounded-full px-4 py-3">
                                <button
                                    onClick={decrement}
                                    className="w-10 h-10 flex items-center justify-center text-forest/50 hover:text-forest transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="font-sans font-medium text-xl text-forest w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={increment}
                                    className="w-10 h-10 flex items-center justify-center text-forest/50 hover:text-forest transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || justAdded}
                                className={`flex-1 py-4 px-8 rounded-full font-sans uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                                    justAdded
                                        ? 'bg-green-600 text-cream'
                                        : 'bg-forest text-cream hover:bg-clay'
                                }`}
                            >
                                {justAdded ? (
                                    <>
                                        <Check size={20} />
                                        Added to Sack!
                                    </>
                                ) : isAdding ? (
                                    <span className="animate-pulse">Adding...</span>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        Add to Sack — ${((activeVariant?.price || product.price) * quantity).toFixed(2)}
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-cream rounded-xl mb-8">
                            <div className="flex items-center gap-3">
                                <Clock size={18} className="text-gold flex-shrink-0" />
                                <span className="font-sans text-sm text-forest">Milled Fresh Weekly</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Truck size={18} className="text-gold flex-shrink-0" />
                                <span className="font-sans text-sm text-forest">Ships in 1-2 Days</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Leaf size={18} className="text-gold flex-shrink-0" />
                                <span className="font-sans text-sm text-forest">Non-GMO Grains</span>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="border-t border-forest/10 pt-8">
                            <h3 className="font-serif text-xl text-forest mb-4">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-sans text-xs uppercase tracking-widest text-loam/50 mb-1">Origin</p>
                                    <p className="font-sans text-forest">Central Texas, USA</p>
                                </div>
                                <div>
                                    <p className="font-sans text-xs uppercase tracking-widest text-loam/50 mb-1">Process</p>
                                    <p className="font-sans text-forest">Traditional Stone Milled</p>
                                </div>
                                <div>
                                    <p className="font-sans text-xs uppercase tracking-widest text-loam/50 mb-1">Storage</p>
                                    <p className="font-sans text-forest">Cool, dry place or freezer</p>
                                </div>
                                <div>
                                    <p className="font-sans text-xs uppercase tracking-widest text-loam/50 mb-1">Shelf Life</p>
                                    <p className="font-sans text-forest">3-6 months (longer frozen)</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 pt-16 border-t border-forest/10"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-serif text-3xl md:text-4xl text-forest">
                                More {getCategoryLabel(product.category)}
                            </h2>
                            <button
                                onClick={() => navigate(`/products?category=${product.category}`)}
                                className="font-sans text-sm uppercase tracking-widest text-forest hover:text-clay transition-colors flex items-center gap-2"
                            >
                                View All
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((relatedProduct, index) => (
                                <motion.div
                                    key={relatedProduct.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => navigate(`/product/${relatedProduct.handle}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-square bg-cream rounded-xl overflow-hidden mb-4">
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-serif text-lg text-forest group-hover:text-clay transition-colors line-clamp-1">
                                        {relatedProduct.name}
                                    </h3>
                                    <p className="font-sans text-clay">${relatedProduct.price.toFixed(2)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Mobile Sticky Add to Cart */}
            <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-forest/10 p-4 lg:hidden z-40">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="font-serif text-lg text-forest line-clamp-1">{product.name}</p>
                        <p className="font-sans text-clay">${(activeVariant?.price || product.price).toFixed(2)}</p>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || justAdded}
                        className={`px-6 py-3 rounded-full font-sans uppercase tracking-widest text-xs flex items-center gap-2 transition-all ${
                            justAdded
                                ? 'bg-green-600 text-cream'
                                : 'bg-forest text-cream'
                        }`}
                    >
                        {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
                        {justAdded ? 'Added!' : 'Add'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetail;

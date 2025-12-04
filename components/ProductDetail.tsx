
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ShoppingBag, ArrowLeft, Wheat, Minus, Plus } from 'lucide-react';

interface ProductDetailProps {
    products: Product[];
    addToCart: (product: Product, quantity?: number) => void;

}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
    const { handle } = useParams<{ handle: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (products.length > 0 && handle) {
            const found = products.find(p => p.handle === handle);
            if (found) setProduct(found);
        }
    }, [products, handle]);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    if (!product) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <p className="font-serif text-2xl text-forest animate-pulse">Loading Grains...</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-bone min-h-screen pt-32 pb-24 px-6 relative"
        >
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}

                className="absolute top-32 left-6 md:left-12 flex items-center gap-2 text-forest/60 hover:text-forest transition-colors font-sans uppercase tracking-widest text-xs z-10"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-12">

                {/* Image Section */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[4/5] bg-cream rounded-[4px] overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-forest/5 mix-blend-multiply pointer-events-none" />
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply contrast-110"
                    />
                </motion.div>

                {/* Details Section */}
                <div className="flex flex-col justify-center">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-1 border border-forest/20 rounded-full font-sans text-xs uppercase tracking-widest text-forest/60">
                                {product.category}
                            </span>
                            <span className="flex items-center gap-1 font-sans text-xs uppercase tracking-widest text-forest/60">
                                <Wheat size={14} />
                                Stone Ground
                            </span>
                        </div>

                        <h1 className="font-serif text-6xl md:text-7xl text-forest mb-4 leading-none">
                            {product.name}
                        </h1>

                        <p className="font-sans text-xl text-clay mb-8 font-medium">
                            ${product.price.toFixed(2)} <span className="text-loam/40 text-sm font-normal ml-2">/ {product.weight}</span>
                        </p>

                        <div className="h-px w-full bg-forest/10 mb-8" />

                        <p className="font-sans text-loam/80 text-lg leading-relaxed mb-12 max-w-lg">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between bg-white border border-forest/10 rounded-full px-6 py-4 gap-8 shadow-sm">
                                <button
                                    onClick={decrement}
                                    className="text-forest/40 hover:text-forest transition-colors"

                                >
                                    <Minus size={18} />
                                </button>
                                <span className="font-sans font-medium text-xl text-forest w-6 text-center">{quantity}</span>
                                <button
                                    onClick={increment}
                                    className="text-forest/40 hover:text-forest transition-colors"

                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button
                                onClick={() => addToCart(product, quantity)}

                                className="flex-1 bg-forest text-cream px-12 py-5 rounded-full font-sans uppercase tracking-widest text-sm font-bold hover:bg-clay transition-colors shadow-xl flex items-center justify-center gap-3 group"
                            >
                                Add to Sack
                                <ShoppingBag size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Additional Info / 'Nutrition' */}
                        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-forest/10 pt-8">
                            <div>
                                <h4 className="font-serif text-xl text-forest mb-2">Origin</h4>
                                <p className="font-sans text-sm text-loam/60">Central Texas, USA</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-forest mb-2">Process</h4>
                                <p className="font-sans text-sm text-loam/60">Traditional Stone Milled</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-forest mb-2">Best For</h4>
                                <p className="font-sans text-sm text-loam/60">Baking, Cooking, & Sharing</p>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetail;

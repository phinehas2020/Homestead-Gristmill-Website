import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useShopify } from '../context/ShopifyContext';

interface CartProps {

}

const Cart: React.FC<CartProps> = () => {
    const { isCartOpen, closeCart, cart, removeLineItem, checkoutUrl } = useShopify();

    const subtotal = cart?.subtotalPrice?.amount || 0;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-forest/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-cream z-50 shadow-2xl p-8 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="font-serif text-3xl text-forest">Your Sack</h2>
                            <button onClick={closeCart}>
                                <X className="text-loam" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8">
                            {!cart?.lineItems?.length ? (
                                <div className="text-center py-12">
                                    <p className="font-sans text-loam/50">The sack is empty.</p>
                                </div>
                            ) : (
                                cart.lineItems.map((item: any) => (
                                    <div key={item.id} className="flex gap-6 items-center">
                                        <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden">
                                            {item.variant?.image?.src && (
                                                <img src={item.variant.image.src} alt={item.title} className="w-full h-full object-cover grayscale opacity-80" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-serif text-lg text-forest">{item.title}</h4>
                                            <p className="font-sans text-sm text-loam/60">
                                                {item.quantity} x ${parseFloat(item.variant.price.amount).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeLineItem(item.id)}
                                                className="text-xs text-red-500 hover:underline mt-1"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-loam/10 pt-8 mt-8">
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-sans text-loam">Subtotal</span>
                                <span className="font-serif text-2xl text-forest">${parseFloat(subtotal.toString()).toFixed(2)}</span>
                            </div>
                            <a
                                href={checkoutUrl || '#'}

                                className={`block w-full bg-forest text-cream py-5 rounded-full font-sans uppercase tracking-widest hover:bg-loam transition-colors duration-500 text-center ${!cart?.lineItems?.length ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                Checkout
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;

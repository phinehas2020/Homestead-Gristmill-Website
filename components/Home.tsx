import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Shop from './Shop';
import Narrative from './Narrative';
import Manifesto from './Manifesto';
import { Product } from '../types';

interface HomeProps {
    products: Product[];
    addToCart: (product: Product, quantity?: number) => void;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

const Home: React.FC<HomeProps> = ({ products, addToCart, onHoverStart, onHoverEnd }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />

            <Shop
                products={products}
                addToCart={addToCart}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
            />

            <Narrative />

            <Manifesto />
        </motion.div>
    );
};

export default Home;

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

}

const Home: React.FC<HomeProps> = ({ products, addToCart }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />

            <Shop
                products={products}
                addToCart={addToCart}

            />

            <Narrative />

            <Manifesto />
        </motion.div>
    );
};

export default Home;

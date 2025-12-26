import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Shop from './Shop';
import Categories from './Categories';
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
            {/* 1. Hero with CTAs and Trust Bar */}
            <Hero />

            {/* 2. Featured Products - Immediate commerce opportunity */}
            <Shop
                products={products}
                addToCart={addToCart}
            />

            {/* 3. Category Navigation - Help users find what they need */}
            <Categories />

            {/* 4. Value Props - Why choose Homestead (compact) */}
            <Narrative />

            {/* 5. Social Proof + Email + Final CTA */}
            <Manifesto />
        </motion.div>
    );
};

export default Home;

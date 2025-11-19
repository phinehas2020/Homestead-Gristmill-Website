
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI, Modality } from "@google/genai";
import { Loader2, Sparkles, Upload, RefreshCw, Wand2 } from 'lucide-react';

interface KitchenLabProps {
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

const KitchenLab: React.FC<KitchenLabProps> = ({ onHoverStart, onHoverEnd }) => {
    const [image, setImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setGeneratedImage(null); // Reset generated image on new upload
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!image || !prompt) return;
        if (!process.env.API_KEY) {
            alert("API Key not found in environment.");
            return;
        }

        setIsLoading(true);

        try {
            // Extract base64 data (remove "data:image/png;base64," prefix)
            const base64Data = image.split(',')[1];
            const mimeType = image.split(';')[0].split(':')[1];

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: mimeType,
                            },
                        },
                        {
                            text: prompt,
                        },
                    ],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            // Handle response
            if (response.candidates?.[0]?.content?.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const base64ImageBytes = part.inlineData.data;
                        const newImageUrl = `data:image/png;base64,${base64ImageBytes}`;
                        setGeneratedImage(newImageUrl);
                        break;
                    }
                }
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Something went wrong in the kitchen. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="kitchen" className="py-32 bg-bone px-6 relative overflow-hidden">
             {/* Background Flour Dust */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]" />
                 <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-clay font-bold uppercase tracking-widest text-sm"
                    >
                        The Test Kitchen
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-serif text-5xl md:text-6xl text-forest mt-4 mb-6"
                    >
                        Visualize your creation.
                    </motion.h2>
                    <p className="font-sans text-loam/70 max-w-xl mx-auto">
                        See what our heritage flour can do for your bake. Upload a photo of your dough or bread, and ask the Miller AI to style it.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Input Section */}
                    <div className="space-y-8">
                        <div 
                            className="border-2 border-dashed border-loam/20 rounded-3xl p-8 text-center hover:border-gold transition-colors cursor-pointer bg-cream/50 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group"
                            onClick={() => fileInputRef.current?.click()}
                            onMouseEnter={onHoverStart}
                            onMouseLeave={onHoverEnd}
                        >
                            {image ? (
                                <img src={image} alt="Original" className="w-full h-full object-cover rounded-xl absolute inset-0" />
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="w-8 h-8 text-forest" />
                                    </div>
                                    <p className="font-serif text-2xl text-forest mb-2">Upload your photo</p>
                                    <p className="font-sans text-loam/60">JPG or PNG supported</p>
                                </>
                            )}
                            {image && (
                                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white transition-colors">
                                    <RefreshCw className="w-5 h-5 text-forest" />
                                </div>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageUpload}
                            />
                        </div>

                        <div className="flex gap-4 items-stretch">
                            <input 
                                type="text" 
                                placeholder="Describe how you want to style it..."
                                className="flex-1 bg-cream border border-loam/10 rounded-xl px-6 py-4 font-sans text-forest placeholder:text-loam/40 focus:outline-none focus:border-gold transition-colors"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onMouseEnter={onHoverStart}
                                onMouseLeave={onHoverEnd}
                            />
                            <button 
                                onClick={handleGenerate}
                                disabled={isLoading || !image || !prompt}
                                onMouseEnter={onHoverStart}
                                onMouseLeave={onHoverEnd}
                                className={`px-8 rounded-xl font-sans font-medium tracking-wide flex items-center justify-center gap-2 transition-all min-w-[140px] ${
                                    isLoading || !image || !prompt 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-forest text-cream hover:bg-loam shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                                {isLoading ? 'Baking...' : 'Style It'}
                            </button>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="border-8 border-white bg-cream rounded-3xl min-h-[400px] lg:h-[650px] flex items-center justify-center relative overflow-hidden shadow-2xl">
                         {!generatedImage && !isLoading && (
                            <div className="text-center p-8 opacity-40 max-w-xs">
                                <div className="w-16 h-16 bg-bone rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <Sparkles className="text-loam w-8 h-8" />
                                </div>
                                <p className="font-serif text-2xl text-loam mb-2">Fresh from the oven</p>
                                <p className="font-sans text-sm text-loam/60">Your generated image will appear here.</p>
                            </div>
                         )}

                         {isLoading && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/90 z-20 backdrop-blur-sm">
                                 <motion.div 
                                     animate={{ rotate: 360 }}
                                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                     className="w-24 h-24 border-4 border-dashed border-gold rounded-full mb-6"
                                 />
                                 <p className="font-serif text-forest text-2xl animate-pulse">The oven is hot...</p>
                                 <p className="font-sans text-loam/60 mt-2 text-sm">Applying: "{prompt}"</p>
                             </div>
                         )}

                         {generatedImage && (
                            <motion.img 
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                src={generatedImage} 
                                alt="Generated result" 
                                className="w-full h-full object-cover"
                            />
                         )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KitchenLab;
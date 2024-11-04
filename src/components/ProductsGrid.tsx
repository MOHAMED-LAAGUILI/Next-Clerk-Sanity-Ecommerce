'use client'; 

import { imageUrl } from "@/lib/imageUrl";
import { Products } from "../../sanity.types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';

const ProductGrid = ({ products }: { products?: Products }) => {
    const productsArray = products?.data || [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {productsArray.length === 0 ? (
                <div className="col-span-full text-center p-6 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">No products available at this time.</h2>
                    <p className="text-gray-500">Please check back later or explore other categories.</p>
                </div>
            ) : (
                <AnimatePresence>
                    {productsArray.map((product: Products) => {
                        const isOutOfStock = product.stock && product.stock <= 0;
                        const imageUrlString = product.image?.asset ? imageUrl(product.image).url() : '';

                        return (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:shadow-xl ${isOutOfStock ? 'opacity-50' : ''}`}
                            >
                                <Link href={`/product/${product.slug?.current}`} className={`flex flex-col p-4 ${isOutOfStock ? 'opacity-50' : ''}`}>
                                    <div className="relative">
                                        {imageUrlString && (
                                            <Image 
                                                src={imageUrlString} 
                                                alt={product.name || 'Product Image'} 
                                                width={300} 
                                                height={300}
                                                className="object-cover h-48 w-full" 
                                                loading="lazy"
                                            />
                                        )}
                                        {isOutOfStock && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                <span className="text-red-500 font-bold">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className="mt-3 text-lg font-semibold text-gray-800">{product.name || 'Unnamed Product'}</h1>
                                    <p className="mt-1 text-gray-600">{product.description || 'No description available'}</p>
                                    <p className="mt-1 font-bold text-gray-800">${product.price}</p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            )}
        </div>
    );
};

export default ProductGrid;

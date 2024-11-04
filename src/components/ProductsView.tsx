'use client';
import React from 'react';
import { Products, Category } from '../../sanity.types';
import Link from 'next/link';
import ProductGrid from './ProductsGrid';

interface ProductViewProps {
    products: Products[];  // This should stay as Products[] since it represents an array of product objects
    categories: Category[];
}

const ProductView = ({ products, categories }: ProductViewProps) => {
    return (
        <div className="flex flex-col container mx-auto p-6">
            {/* Categories */}
            <div className="w-full mb-6">
                <h1 className="text-3xl font-bold mb-4 dark:text-red-500">Categories</h1>
                <ul className="flex flex-wrap space-x-4">
                    {categories.map(category => (
                        <li key={category._id}>
                            <Link href={`/category/${category.slug?.current}`}>
                                <span className="text-blue-600 hover:underline transition">{category.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Products */}
            <div>
            <h1 className="text-3xl font-bold mb-4 dark:text-red-500">Products</h1>
               
                <ProductGrid products={products} />
               
            </div>
        </div>
    );
};

export default ProductView;
